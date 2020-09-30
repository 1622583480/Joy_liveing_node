const fs = require('fs');
const path = require('path');
const { base } = require('../../../config/config')
module.exports = function (req, res) {
    if (!(req.files.length <= 0 || req.files == {})) {
        Object.keys(req.files).forEach(key => {
            let matches = req.files[key].name.lastIndexOf(".");
            let ext = req.files[key].name.substr(matches);
            try {
                fs.renameSync(req.files[key].path, `${path.join(__dirname, `../../../public/upload/img`)}\\IWND${new Date().getTime()}JDNW${ext}`)
                let img_Url = `${base}/IWND${new Date().getTime()}JDNW${ext}`
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