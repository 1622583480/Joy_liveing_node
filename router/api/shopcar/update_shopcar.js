const { amend_shopcar ,shopcar_index} = require('../../../controls/shopcar')
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
    const { index, num, parameter_index } = req.fields
    if (typeof index == "undefined" || typeof num == "undefined" || typeof parameter_index == "undefined") {
        res.json({ code: 301 })
        return
    }
    if (parameter_index === "null") {
        let result = await shopcar_index({ index, parameter_index, username: req.tokenstate.content.username })
        res.json(result)
        return
    }
    try {
        let result = await amend_shopcar({ index, num, parameter_index, username: req.tokenstate.content.username })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}