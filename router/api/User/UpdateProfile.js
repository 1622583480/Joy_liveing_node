const { updateprofile } = require('../../../controls/UserSql');



module.exports = function (req, res) {
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
    if (typeof req.tokenstate.tokenCode == 'undefined') {
        res.json({
            code: 301
        })
        return
    }
    const { NewMaterial } = req.fields
    if (!NewMaterial) {
        res.json({
            code: 301
        })
        return;
    }
    // 处理前端的文件 
    let NewMaterialvalue = null;
    let NewMaterialkey = null;
    Object.keys(NewMaterial).forEach((item, index) => {
        NewMaterialvalue = [NewMaterial[item], req.tokenstate.content.username]
        NewMaterialkey = item
        updateprofile({ NewMaterialkey, NewMaterialvalue }, (result) => {

        })
    })
    res.json({ code: 204 })
}