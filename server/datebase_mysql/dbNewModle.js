//此页面用于在不修改有数据库的情况下添加数据库表格
const Sequelize = require("sequelize");
const MYSQL_CONFIG = require("../config/mysql_config");

class DataBasicModel{
    constructor(){
        this.tableModels = {};
        this.sequelize = null;
        this.force = true;
        this.logging = false;
        this.isFirst = true;
        this.shouldCreateData = true;
        this.createTestData = this.createTestData.bind(this);
        this.initTableStruct = this.initTableStruct.bind(this);
        this.deleteTableExits = this.deleteTableExits.bind(this);
    }

    init(){
        return new Promise((resolve,reject) => {
            this.initConnection();
            console.log("初始化数据库中......");
            this.testConnection()
                .then(this.deleteTableExits)
                .then(this.initTableStruct)
                .then(this.createTestData)
                .then(() => {
                    console.log("");
                    console.log("数据库初始化完毕!");
                    resolve();
                })
                .catch(reject);
        });
    }
    initConnection() {
        this.sequelize = new Sequelize({
            database: MYSQL_CONFIG.database, //数据库名称
            username: MYSQL_CONFIG.username, //数据库用户名
            password: MYSQL_CONFIG.password, //数据库密码
            host: MYSQL_CONFIG.host, //数据库主机IP
            dialect: "mysql", //数据库类型
            pool: { //连接池配置
                max: 5, //最大连接数
                min: 0, //最小连接数
                acquire: MYSQL_CONFIG.aquireTimeout, //请求超时时间
                idle: 10000 //断开连接后，连接实例在连接池保持的时间
            },
            logging: this.logging
        });
    }
    //测试连接是否正常
    testConnection() {
        console.log(`数据库连接测试中...`);

        return new Promise((resolve, reject) => {
            this.sequelize
                .authenticate()
                .then(() => {
                    console.log("连接建立成功");
                    resolve();
                })
                .catch(err => {
                    reject();
                    throw new Error(`无法连接数据库:${err.message}`);
                });
        });
    }
  
    //初始化之前需要先删除已有表格，因为存在外键约束，所以需要先删除子表
    deleteTableExits() {
        return new Promise((resolve, reject) => {
            if (this.isFirst) {
                this.sequelize.queryInterface.dropTable("resource")
                    .then(() => {
                        console.log("resource表删除");
                        resolve();
                    })
                    .catch(reject);
            } else {
                resolve();
            }
        });
    }

    initTableStruct() {
        /**
         * 资源路径列表
         * @param{name}   资源的名称
         * @param{description}   资源的描述
         * @param{address}  资源的路径
         */
        this.tableModels.Resource = this.sequelize.define('resource', {
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            typesOf: {
                type: Sequelize.STRING(255),
            },
            description: {
                type: Sequelize.STRING(255),
            },
            address: {
                type: Sequelize.STRING(255),
            }
        }, {
            freezeTableName: true
        });


        return new Promise((resolve, reject) => {
            //同步实例与DB
            const force = this.force;
            if (this.isFirst) {
                    Promise.all([
                       // this.tableModels.Procedure.sync({ force }),
                    ])
                    .then(() => {
                        return Promise.all([
                            this.tableModels.Resource.sync({ force })
                        ]);
                    })
                    .then(resolve)
                    .catch(err => {
                        console.info("初始化数据库结构时出现错误");
                        console.info(err);
                        reject(err);
                    });
            } else {
                resolve();
            }
        });
    
    }

    
    createTestData() {
        return new Promise((resolve, reject) => {
            if (this.shouldCreateData) {
                // this.tableModels.Procedure.bulkCreate([
                //     //
                //     { name: "O3V2.0", response: "yangchunmei",teacher: "yangchunmei", mail: "yangchunmei", remarks: "pengjuadfdgfnli", status: "pending" ,process:"1",submit:"杨春梅"},
                //     { name: "O3V1.0", response: "yangchunmei,yanhuan",teacher: "yangchunmei", mail: "yangchunmei", remarks: "pengsdfsfjuanli", status: "resubmit",process:"1" ,submit:"杨春梅"},
                // ])
                // this.tableModels.PorcessNode.bulkCreate([
                //     //
                //     { procedureid :"1", nodename:'修改',remarks:'',operator:'aaa',time:new Date()},
                //     { procedureid :"1", nodename:'添加',remarks:'',operator:'aaa' ,time: new Date()},
                // ])
                this.tableModels.Resource.bulkCreate([
                    //
                    {
                        name: '组内部分代码线位置',
                        typesOf: "work",
                        description: '【各主线代码】',
                        address: 'http://192.168.100.233:18080/svn/GNEUI',
                    }, 
                    {
                        name: '组内资料文档位置',
                        typesOf: "work",
                        description: '【主要存放培训课件、制度规范、项目总结文档等,svn用户名 全拼小写，密码123456】',
                        address: 'http://192.168.99.17:8083/svn/软件开发部/05.资源组文件/04.前端开发'
                    }, {
                        name: '组内gitHub地址',
                        typesOf: "work",
                        description: '【主要存放组件源码及工具包等】',
                        address: 'https://github.com/reasyTeam',
                    }, {
                        name: 'bugfree',
                        typesOf: "work",
                        description: '【查看项目bug，关闭bug】',
                        address: 'http://192.168.100.23/bugfree/index.php?r=site/login'
                    },{
                        name: '中转文件位置',
                        typesOf: "work",
                        description: '【 用于公司电脑之间，文件中转 】',
                        address: 'http://192.168.99.241-999中转文件夹'
                    }, {
                        name: 'testLink',
                        typesOf: "work",
                        description: '【 测试用例  用户名 全拼小写 密码123456 】',
                        address: 'http://192.168.100.23/testlink/index.php?caller=login'
                    },{
                        name: 'eoa',
                        typesOf: "work",
                        description: '【 考勤查询，请假签卡流程提交  】',
                        address: 'http://eoa.tenda.cn'
                    },{
                        name: 'agile',
                        typesOf: "work",
                        description: '【 项目情况，填写工时 】',
                        address: 'http://plm.tenda.cn:7001/Agile/default/login-cms.jsp'
                    }, {
                        name: 'CI服务器路径',
                        typesOf: "work",
                        description: '【 在线工具等 用户名 中文用户名  密码 全拼小写 】',
                        address: 'http://192.168.99.17'
                    }, {
                        name: '翻译工具',
                        typesOf: "tool",
                        description: '【组内翻译工具】',
                        address: 'https://github.com/reasyTeam/b28-cli'
                    }
                ])
                .then(resolve)
                .catch(err=> {
                    console.info("初始化表格数据出错");
                })
            }
        })
    }
}


    let dbModel = new DataBasicModel();

    dbModel.init();
module.exports = dbModel;