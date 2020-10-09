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
    var { goodsid, num, parameter, postscript, address, coupon } = req.fields;

    let indentlength = null
    let result = null
    if (typeof coupon == "undefined") {
        coupon = 'null'
    }
    if (typeof parameter == "undefined") {
        parameter = 'null'
    }
    if (goodsid.length == parameter.length == num.length) {
        indentlength = goodsid.length
    }
    for (let i = 0; i < indentlength.length; i++) {
        try {
            let random = randomNumber()
            result = await initialize_indent([random, '未付款', goodsid[i], num[i], new Date().getTime(), req.tokenstate.content.username, parameter[i], postscript, address, coupon])
        } catch (error) {
            res.json(error)
        }
    }
    res.json({ code: result, data: random })
}