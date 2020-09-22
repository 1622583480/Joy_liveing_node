const { updateprofile } = require('../../../controls/UserSql')
const fs = require('fs');
const path = require('path')


module.exports = function (req, res) {
    // const { NewMaterial } = req.fields
    // console.log(NewMaterial)
    // const fieldkeys = []
    const fieldvalues = []
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
    // updateprofile()
    res.json({
        code: 2003,
        // fieldkeys,
        fieldvalues
    })
}