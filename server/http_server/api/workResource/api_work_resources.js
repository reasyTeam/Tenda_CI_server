const express = require("express");
const router = express.Router();
const Resource_con = require("../../controller/resources/con_resources");

/**
 * 请求对应的在CI_con中的操作
 */
const ACTIONS_MAP = {
    "/getResourceList": "getResource",
    "/insertResourceList": "insertResource",
    "/updateResourceList": "updateResource",
    "/deleteResourceList": "deleteResource"
};
let prop;
/**
 * 匹配   /api/CI/** 下的请求
 * 请求对应的处理为ACTIONS_MAP中的函数;
 */
for (prop in ACTIONS_MAP) {
    let closure_prop = prop;
    router.post(prop, (req, res) => {

        Resource_con[ACTIONS_MAP[closure_prop]](req.body)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    });
}

module.exports = router;
