const { indent_order } = require('../../../controls/indent')
module.exports = async function (req, res) {
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
    const { detailid, code } = req.fields
    if (typeof detailid == "undefined" || typeof code == "undefined") {
        res.json({
            code: 204
        })
        return
    }
    try {
        let result = await indent_order(['待发货', req.tokenstate.content.username,detailid])
        res.json(result)
    } catch (error) {
        res.json(error)
    }


}