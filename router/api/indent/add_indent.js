const { initialize_indent, randomNumber } = require('../../../controls/indent')
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
    var { goodsid, num, parameter_id, postscript, address_id, coupon } = req.fields
    if (typeof coupon == "undefined") {
        coupon = 'null'
    }
    if (typeof parameter_id == "undefined") {
        parameter_id = 'null'
    }
    try {
        let random = randomNumber()
        let result = await initialize_indent([random, '未付款', goodsid, num, new Date().getTime(), req.tokenstate.content.username, parameter_id, postscript, address_id,coupon])
        res.json({ code: result, data: random })
    } catch (error) {
        res.json(error)
    }
}