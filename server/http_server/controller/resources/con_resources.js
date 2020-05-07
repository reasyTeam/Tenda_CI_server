//引入数据库
const dbModel = require("../../../datebase_mysql/dbModel");
const resourcesManager = require("../../models/resources/resourcesManage");

class RescourcesControl {
    getResource(data) {
        return new Promise((resolve, reject) => {
            resourcesManager
                .selectTable(data)
                .then((value) => {
                    resolve({ status: "ok", list: value });
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        err: "获取数据出错了",
                        status: "出错啦",
                    });
                });
        });
    }

    updateResource(data) {
        let where = {
            id: {
                "$eq": `${data.id}`
            }
        }
        return new Promise((resolve, reject) => {
            resourcesManager
                .updateTable(data,where)
                .then((value) => {
                    resolve({ status: "ok" });
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        err: "更新数据出错了",
                        status: "出错啦",
                    });
                });
        });
    }

    deleteResource(data) {
        let where = {
            id: {
                "$eq": `${data.id}`
            }
        }
        return new Promise((resolve, reject) => {
            resourcesManager
                .dateleItem(where)
                .then((value) => {
                    resolve({ status: "ok" });
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        err: "删除数据出错了",
                        status: "出错啦",
                    });
                });
        });
    }

    insertResource(data) {
        return new Promise((resolve, reject) => {
            resourcesManager
                .insertTable(data)
                .then((value) => {
                    resolve({ status: "ok"});
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        err: "添加数据出错了",
                        status: "出错啦",
                    });
                });
        });
    }
}
module.exports =  new RescourcesControl();