//引入数据库
const dbModel = require("../../../datebase_mysql/dbModel");
const Mailer = require("../../../mail_server/mail");
const ejsExcel = require("ejsExcel");
const fs = require("fs");
const xlsx = require("node-xlsx");
const clManager = require("../../models/procedure/checklistManager")

class ChecklistControl {


 /**
     * 得到所有的成员姓名和mail
     */
    getAllMembers() {
        return new Promise((resolve, reject) => {
            dbModel.tableModels.User
                .findAll({attributes: ["mail", "name"]})
                .then(value => {
                    resolve({
                        status: 'ok',
                        members: value
                    })
                })
                .catch(err => {
                    reject({
                        status: "error",
                        errMessage: err.message
                    });
                });
        })
    }

    /**
     * 添加转测 checklist 
     * @param {*流程的参数} args
     * 
     */
    setProcedure(args) {
        var data = [];
        var nodedata = [];

        if (args.procedure.response.indexOf(args.userMail) != '-1') {
            args.procedure.submit = args.userName;
        }
       // args.procedure.remarks = args.procedure.remarks + "    " + "提交人：  " + args.userName + " 提交时间: " + new Date().toLocaleString() + " ";

        // 判断负责人数
        if (args.procedure.response.split(",").length > 1) {
            args.procedure.status = "resubmit";
        }

        data[0] = args.procedure;

        return new Promise((resolve, reject) => {
           clManager.insert(data)
                .then((value) => {
                    nodedata[0] = {
                        procedureid : value[0].dataValues.id,
                        nodename : "新建流程",
                        time : new Date().toLocaleString(),
                        remarks : args.procedure.remarks,
                        operator : args.userName
                    }
                    return Promise.all([
                        clManager.createChecklistTable(args['checklist'],value),
                        clManager.updateNodeTable(nodedata),
                    ]) 
                })
                .then(value => {
                    clManager.sendMail(value[0]);
                    resolve({
                        status: "ok"
                    });
                })
                .catch(err => {
                    console.log(err);
                    reject({
                        err: "添加数据出错了",
                        status: "出错啦"
                    });
                });
        });
    }

    /**
     * 查询 checklist 表
     * @param {需要查询的状态} args.status
     * @param {查询人 只能查询本人相关的数据} args.userName
     */
    getHandleList(args) {

        let that = this;
        that.status = args.status;
        that.userMail = args.userMail;
        that.userName = args.userName;
        let status1 = that.status == "pending" ? "resubmit" : "ending1";
        
        return new Promise((resolve, reject) => {
            clManager.selectTable(that.status,status1,that.userMail)
                .then(value => {
                    var HandleLists = {};
                    if (value[0] != undefined) {
                        HandleLists = value[0].map(HandleList => {
                            let list = HandleList.dataValues;
                            list.checklistData = clManager.selectChecklistData(list.id) || "";
                            return list;
                        });
                    }
                    resolve({
                        status: "ok",
                        HandleLists,
                        members:value[1],
                        name:that.userName
                    });
                })
                .catch(err => {
                    reject({
                        err: '出错了呢'
                    });
                });
        });
    }

    /**
     * 
     * @param {*} args  提交过来的数据    主要提交表格数据 根据提交人来判断是否所有人提交完成
     */
    handleSubmit(args) {
        let data = args;

        data.submit = data.submit == "" ? data.userName : (data.submit + "," + data.userName);
        //data.remarks = data.remarks + "    "+ "提交人：" + data.userName+"提交时间"+ new Date().toLocaleString() +"/n";

        // 如果所有人提交完成  改变流程状态  发送邮件

        if (this._ifSubmitAll(data.response, data.submit) == true) {
            data.status = "pending";
        } else {
            data.status = "resubmit";
        }

        let updataObj = { status: `${data.status}`, submit: `${data.submit}` },
            where = {
                id: {
                    "$eq": `${data.id}`
                }
            };

        let nodedata = [{
            procedureid : data.id,
            nodename : "提交表格",
            time : new Date().toLocaleString(),
            operator : data.userName
        }]  
        return new Promise((resolve, reject) => {
            Promise.all([
                clManager.updateTable(updataObj, where),
                clManager.updateNodeTable(nodedata)
            ])
            .then(() =>{
                return clManager.selectId(data.id)
            })
            .then((value) => {
                if(value.status = "pending"){
                    return clManager.sendMail(value.dataValues);
                }else{
                    resolve({ status: "ok", message: "成功" });
                }
            })
            .then(() => {
                resolve({ status: "ok", message: "成功" });
            })
            .catch(err => {
                reject(err);
            });
        });
    }
    /**
     * @param {*} 修改流程 
     */

    handleEdit(args) {
        let data = args;
        let updataObj = data.procedure,
            where = {
                id: {
                    "$eq": `${updataObj.id}`
                }
            };
        let nodedata = [{
            procedureid : updataObj.id,
            nodename : "修改",
            time : new Date().toLocaleString(),
            operator : data.userName
        }]  

        return new Promise((resolve, reject) => {
            Promise.all([
                clManager.updateTable(updataObj, where),
                clManager.updateNodeTable(nodedata)
            ])
            .then(() => {
                resolve({ status: "ok", message: "成功" });
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    _ifSubmitAll(response, submit) {
        response = response.split(",");
        submit = submit.split(",");
        if (response.length == submit.length) {
            return true;
        }
        return false;

    }

    /**
     * 改变流程状态  通过 or 驳回
     * 得到当前修改人姓名 加入评审意见中
     * @param {需要修改的状态} args.status
     * @param {需要修改的评审意见} args.opinion
     * @param {当前修改人} args.userName
     */

    handleProcedure(args) {

        let data = args;
        //data.date = new Date().toLocaleString();
        // data.opinion = data.opinion + "审核人： " + data.userName + "审核时间"+ data.date +"/n";
        let updataObj = { status: `${data.status}`, opinion: `${data.opinion}` },
            where = {
                id: {
                    "$eq": `${data.id}`
                }
            };
        let nodedata = [{
            procedureid : data.id,
            nodename : "审核",
            remarks : "通过 "+ data.opinion,
            time : new Date().toLocaleString(),
            operator : data.userName
        }]  
        
        /**
         *   状态变为 resubmit 需要清空提交人重新提交 
         */
        if (data.status != "ending") {
            updataObj.submit = "";
            nodedata[0].remarks = nodedata[0].remarks.replace(/(通过)/,"驳回");
        }

        return new Promise((resolve, reject) => {
            Promise.all([
                clManager.updateTable(updataObj, where),
                clManager.updateNodeTable(nodedata)
            ])
            .then(() =>{
                return clManager.selectId(data.id)
            })
            .then((value) => {
                return clManager.sendMail(value.dataValues);
            })
            .then(() => {
                resolve({ status: "ok", message: "成功" });
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}
    module.exports = new ChecklistControl();