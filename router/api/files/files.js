const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    const { type } = req.fields
    if (type == "newproduct") {

    }
    if (type == "updateproduct") {

    }
    if (type == "userheaderpoto") {
        if (req.tokenstate.tokenCode == 401) {
            res.json({
                code: 401
            })
            return
        }
        if (req.tokenstate.tokenCode == 402) {
            res.json({
                code: 402
            })
            return
        }
        if (req.tokenstate.tokenCode == 417) {
            if (!(req.files.length <= 0 || req.files === {})) {
                Object.keys(req.files).forEach(key => {
                    for (let item in req.files[key]) {
                        let matches = req.files[key][item].name.lastIndexOf("."); //这一段 是获取文件后缀的索引值 
                        let ext = req.files[key][item].name.substr(matches);//截取文件后缀 .png .jpg
                        try {
                            fs.renameSync(req.files[key][item].path, `${path.join(__dirname, `../../../public/upload/user`)}\\User_${new Date().getTime()}${ext}`)

                            let headpoto = `${path.join(__dirname, '../../../public/upload/user')}\\User_${new Date().getTime()}${ext}`
                            // 返回给前端的新地址 
                        } catch (error) {
                            res.json(error)
                        }
                    }
                });
            }
            return
        }
    }

}