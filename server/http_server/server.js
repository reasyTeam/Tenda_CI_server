//Dependencies
const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

//global debug definition
//仅在调试时开启对应的debug开关，部署时需要全部关闭
global.debug = {
    product: false,
    oemProduct: true,
    util: false,
    db: false,
    shouldCoverDatabase: false,
    svn: false,
    notifier: false,
    shouldLogWhenCheck: false,
    shouldCloseCICheck: true
};

//Custom requirements
const notifier = require("./Notifier");
const dbModal = require("../datebase_mysql/dbModel");

//引入各级路由
const CIRouter = require("./api/CI/api_CI");
const CompileRouter = require("./api/tools/api_compile");
const OemRouter = require("./api/tools/api_oem");

//配置项
const basicConfig = require("../config/basic_config");
const httpConfig = basicConfig.httpConfig;

class HttpServer {
    constructor() {
        //express实例
        this.app = null;
        //server实例
        this.server = null;
        this.startHttpServer = this.startHttpServer.bind(this);
    }

    init() {
        //生成express实例
        this.app = new express();
        //引入中间件
        this.useMiddleWares();
        //引入路由
        this.useRouters();
        //创建CI储存的文件夹和OEM储存文件夹
        this.creatRootFolders();
        //开启CI服务器
        this.startCI();
    }

    useMiddleWares() {
        const app = this.app;
        app.set("views", path.join(__dirname, "../web/dist"));
        app.set("view engine", "html");
        //解析session
        //TODO:登录模块验证
        app.use(session({
            secret: "secret",
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000
            }
        }));

        //解析post
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        //用于cookie解析
        app.use(cookieParser());

        //使用morgan的日志功能
        app.use(morgan('dev'));
        //将web_ui设置为静态资源目录
        app.use(express.static(path.join(__dirname, '../web/dist')));
    }

    useRouters() {
        const app = this.app;
        //使用各模块路由
        app.use("/api/CI", CIRouter);
        app.use("/api/compile", CompileRouter);
        app.use("/api/oem", OemRouter);

        //主页请求
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "../web/dist/index.html"));
        });
    }

    startHttpServer() {
        return new Promise(resolve => {
            this.server = this.app.listen(httpConfig.port, () => {
                resolve();
                console.log(`CI server is listening at http://localhost:${this.server.address().port}`);
            });
        });
    }

    creatRootFolders() {
        try {
            !fs.existsSync(basicConfig.svnConfig.root) && fs.mkdirSync(basicConfig.svnConfig.root);
            !fs.existsSync(basicConfig.oemConfig.root) && fs.mkdirSync(basicConfig.oemConfig.root);
            !fs.existsSync(basicConfig.oemConfig.imgTempFolder) && fs.mkdirSync(basicConfig.oemConfig.imgTempFolder);
            !fs.existsSync(basicConfig.oemConfig.imgBackupFolder) && fs.mkdirSync(basicConfig.oemConfig.imgBackupFolder);
        } catch (e) {

        }
    }

    startCI() {
        //初始化数据库之后再启动http服务器，避免刚启动就收到请求，然后数据库还没初始化完成
        dbModal
            .init()
            .then(this.startHttpServer)
            .then(notifier.run)
            .catch(err => {
                //如果无法启动则需要抛出错误，终止服务器
                throw err;
            });
    }
}

const httpServer = new HttpServer();
httpServer.init();