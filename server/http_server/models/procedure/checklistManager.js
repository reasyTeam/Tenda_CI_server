//引入数据库
const dbModel = require("../../../datebase_mysql/dbModel");
const Mailer = require("../../../mail_server/mail");
const ejsExcel = require("ejsExcel");
const fs = require("fs");
const xlsx = require("node-xlsx");

class ChecklistManager {
    /**
     * 添加新数据 
     */
    insert(data) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Procedure.bulkCreate(data)
            .then((value)=>{
                resolve(value);
            })
            .then(resolve)
            .catch(err => {
                console.info("插入数据库时出现错误");
                reject(err);
            })
        })
    }

    /**
     * 查询id的数据
     */
    selectId(id) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Procedure
            .findOne({
                where:{
                    id: {
                        "$eq": `${id}`
                    }
                }
            })
            .then(value => {
                resolve(value);
            })
            .catch(err => {
                console.log('插入出错了');
                reject();
            })
        })
    }

    updateNodeTable(nodedata){
        return new Promise((resolve, reject) => {
            dbModel.tableModels.PorcessNode.bulkCreate(nodedata)
            .then(value => {
                resolve(value);
            })
            .catch(err => {
                console.log('查询出错了');
                reject();
            })
        })
    }
    /**
     * 更新数据
     */
    updateTable(updataObj, where) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Procedure.update(updataObj, { where })
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    console.log('更新出错了');
                    reject();
                })
        })

    }

    /**
     * 根据 最新id  新建checklist表
     */
    createChecklistTable(data,values) {

        return new Promise((resolve, reject) => {
            this._createExcel(data, values[0].dataValues)
                .then(value => {
                    resolve(value)
                })
                .catch(err => {
                    console.log(err);
                    reject();
                });
        });
    }

    /**
     * 保存 checklist 数据为xlsx表格
     * @param {xlsx数据} data 
     * @param {流程的id} id 
     */
    _createExcel(data, value) {

        var exlBuf = fs.readFileSync("../resourcecs/checklist/checklist.xlsx");
        var path = "../resourcecs/checklist/checklist" + value.id + ".xlsx";

        return new Promise((resolve, reject) => {
            ejsExcel.renderExcelCb(exlBuf, data, function(err, exlBuf2) {
                if (err) {
                    reject(err);
                    return;
                }
                fs.writeFileSync(path, exlBuf2);
                console.log("生成checklist" + value.id + ".xlsx");
                resolve(value);
            });
        });
    }

    /**
     * 发送邮件
     */
    sendMail(value) {
        this.mailer = new Mailer();
        var that = this;
        var path = "../resourcecs/checklist/checklist" + value.id + ".xlsx";
        var mail = that._judgeMail(value);
        var response = [];
        var users = [];
        console.log("邮件发送给" + mail.mailto);
        console.log("邮件抄送给" + mail.copyTo);

        // debug 使用 邮件不发出去 只发给自己
        mail.mailto = ['yangchunmei'];
        mail.copyTo = [];

        return new Promise((resolve, reject) => {

            dbModel.tableModels.User
                .findAll({ attributes: ["mail", "name"] })
                .then(values => {
                    // 负责人查询对应的姓名
                    users = values.map(user =>{
                        user = user.dataValues
                        if(value.response.indexOf(user.mail) != -1){
                            response.push(user.name);
                        }
                        return user;
                    })
                    response = response.join(',');    
                    
                   return that.mailer.mailWithTemplate({
                        to: mail.mailto, //['yangchunmei'], //mailto
                        copyTo: mail.copyTo, // [''], //copyTo
                        subject: `checklist表流程`,
                        attachments: [{
                            filename: `checklist${value.id}.xlsx`,
                            path: path
                        }],
                        template: "checklist",
                        templateOptions: {
                            msg: `${mail.msg}`,
                            name: `${value.name}`,
                            response: `${response}`
                        }
                    })
                })
                .then(() => {
                    resolve({
                        status: "ok"
                    });
                })
                .catch(err => {
                    console.log(err);
                    reject({
                        err: "发送checklist邮件失败"
                    });
                })
        });
    }
    /**
     * 4 种发送邮件
     * 1. 待审核  状态为 pending   发送给审核人  抄送页面负责人
     * 2. 审核通过  状态为 ending  发送给软件负责人 抄送给审核人和页面负责人
     * 3. 审核驳回  提交人为空     发送给页面负责人 抄送给审核人
     * 4. 待提交  提交人不是全部提交  只发送给页面负责人  
     */
    _judgeMail(value) {
        var mail = {};
        mail.mailto = [];
        mail.copyTo = [];
        mail.msg = "";


        if (value.status == "pending") {
            mail.mailto = value.teacher.split(',');
            mail.copyTo = value.response.split(',');
            mail.msg = "该项目已提交checklist流程，请审核";
            return mail;
        }
        if (value.status == "ending") {
            mail.mailto = value.teacher.split(',');
            mail.mailto.push(value.mail);
            mail.copyTo = value.response.split(',');
            mail.msg = "项目的checklist如附件，请查收";
            return mail;
        }
        if (value.status == "resubmit" && value.submit == '') {
            mail.mailto = value.response.split(',');
            mail.copyTo = value.teacher.split(',');
            mail.msg = "项目的checklist流程被驳回，请登陆CI查看审核意见，并重新提交";
            return mail;
        } else {
            mail.mailto = value.response.split(',');
            mail.msg = "项目成员已提交checklist，请登录提交checklist表";
            return mail;
        }

    }

    /**
     * 根据当前人 和 状态 查询数据
     * 
     */
    selectTable(status1, status2, userMail) {
        // admin 用户可以查看全部 
        if (userMail == "CITest") {
            userMail = "";
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                    dbModel.tableModels.Procedure
                    .findAll({
                        where: {
                            $or: [
                            {
                                status: {
                                    "$in": [`${status1}`, `${status2}`]
                                },
                                response: {
                                    "$like": `%${userMail}%`
                                }
                            }, {
                                status: {
                                    "$eq": `${status1}`
                                },
                                teacher: {
                                    "$like": `%${userMail}%`
                                }
                            }]
                        },
                        include: {
                            model: dbModel.tableModels.PorcessNode,
                            as:"processnode",
                            attributes:["nodename","time","remarks","operator"]
                        }
                    }),
                    dbModel.tableModels.User
                    .findAll({ attributes: ["mail", "name"] })
                ])
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    console.log(err);
                    reject();
                })
        })
    }

    /**
     * 取得 checklist.xlsx数据
     * @param {流程表的id} id 
     */
    selectChecklistData(id) {
        var checklistData = [];
        var data = [];
        var path = "../resourcecs/checklist/checklist" + id + ".xlsx";
        var i;

        var dataexecl = xlsx.parse(path) || "";
        data = dataexecl[0].data || "";
        if (data != "") {
            for (i = 3; i < 21; i++) {
                checklistData[i - 3] = {};
                checklistData[i - 3].ifchecked = data[i][4] || "";
                checklistData[i - 3].response = data[i][5] || "";
                checklistData[i - 3].remarks = data[i][6] || "";
            }
        }

        return checklistData;
    }


}
module.exports = new ChecklistManager();