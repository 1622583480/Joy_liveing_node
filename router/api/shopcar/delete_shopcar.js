const { delete_shopcar } = require('../../../controls/shopcar')
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
    const { index } = req.fields
    if (typeof index == "undefined") {
        res.json({ code: 301 })
    }
    try {
        let result = await delete_shopcar({ username: req.tokenstate.content.username, index })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}