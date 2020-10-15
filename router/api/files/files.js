const fs = require('fs'); //处理本地文件
const path = require('path');  //生成绝对路径
const { base } = require('../../../config/config')  //项目根目录
module.exports = function (req, res) {
    if (!(req.files.length <= 0 || req.files == {})) {  
        Object.keys(req.files).forEach(key => {
            let matches = req.files[key].name.lastIndexOf(".");
            let ext = req.files[key].name.substr(matches);
            let filesname = new Date().getTime()
            try {
                fs.renameSync(req.files[key].path, `${path.join(__dirname, `../../../public/upload/img`)}\/IWND${filesname}JDNW${ext}`)
                let img_Url = `${base}/img/IWND${filesname}JDNW${ext}`
                res.json({ code: 204, img_Url })
            } catch (error) {
                res.json(error)
            }
            // })
        });
        return
    }
    res.json({ code: 301 })
}