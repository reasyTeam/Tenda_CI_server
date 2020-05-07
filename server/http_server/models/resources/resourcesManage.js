const dbModel = require("../../../datebase_mysql/dbModel");

class resourcesManager {
      /**
     * 添加新数据 
     */
    insertTable(data) {
        return new Promise((resolve, reject) => {
            dbModel.tableModels.Resource.bulkCreate([data])
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
     * 更新数据
     */
    updateTable(updataObj, where) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Resource.update(updataObj, { where })
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
     * 更新数据
     */
    dateleItem(where) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Resource.destroy({ where })
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    console.log('处理数据库出错了');
                    reject();
                })
        })

    }

     /**
     * 查询对应类型的资源路径
     */
    selectTable(data) {

        return new Promise((resolve, reject) => {
            dbModel.tableModels.Resource
            .findAll({
                where:{
                    typesOf: {
                        "$eq": `${data.typesOf}`
                    }
                }
            })
            .then(value => {
                resolve(value);
            })
            .catch(err => {
                console.log('查询出错了');
                reject();
            })
        })
    }


}
module.exports = new resourcesManager();