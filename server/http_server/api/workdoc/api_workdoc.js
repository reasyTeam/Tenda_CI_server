const express = require("express");
const router = express.Router();
const path = require("path");
const basicConfig = require("../../../config/basic_config").workConfig;
const fs = require("fs");
/**
 * 返回下载文件
 */


router.get("/download/excel/:productName", (req, res) => {
    let excelDir = path.join(basicConfig.root, req.params.productName);

    if (fs.existsSync(excelDir)) {
        res.download(excelDir);
    } else {
        res.json({
            status: "error",
            errMessage: excelDir +'文件路径不存在'
        });
    }
});


module.exports = router;