const { updateprofile } = require('../../../controls/UserSql')
const fs = require('fs');
const path = require('path')


module.exports = function (req, res) {
    const { NewMaterial } = req.fields
    if (!NewMaterial) {
        res.json({
            code: 301
        })
        return;
    }
    // 处理前端的文件 
    if (!(req.files.length <= 0 || req.files === {})) {
        Object.keys(req.files).forEach(key => {
            for (let item in req.files[key]) {
                let matches = req.files[key][item].name.lastIndexOf(".");
                let ext = req.files[key][item].name.substr(matches);
                try {
                    fs.renameSync(req.files[key][item].path, `${path.join(__dirname, '../../../public/upload/user')}\\User_${new Date().getTime()}${ext}`)
                } catch (error) {
                    console.log(error)
                }
            }
        });
    }

    let MaterialSQL = ``;
    for (let item in NewMaterial) {
        MaterialSQL = MaterialSQL + item + '=' + NewMaterial[item] + ','
    }
    console.log(MaterialSQl)
    updateprofile({ MaterialSQL, }, (res) => {

    })

}