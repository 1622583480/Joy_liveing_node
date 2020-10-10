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
    if (typeof goodsid == 'undefined' || typeof num == "undefined") {
        res.json({ code: 301 })
        return
    }
    let indent_collection = null; // 生成一个 订单集合
    let indentlength = null; // 监听所有商品的长度 
    let result = 302; // 状态码
    if (typeof coupon == "undefined") {
        coupon = 'null'
    }
    if ((goodsid.length == parameter.length) && (goodsid.length == num.length)) {
        indentlength = goodsid.length
    }
    for (let i = 0; i < indentlength; i++) {
        try {
            let random = randomNumber()
            if (indentlength > 1 && indent_collection === null) {
                indent_collection = randomNumber()
            }
            if (indentlength === 1) {
                indent_collection = random
            }
            result = await initialize_indent([random, '未付款', goodsid[i], num[i], new Date().getTime(), req.tokenstate.content.username, parameter[i], postscript, JSON.stringify(address), JSON.stringify(coupon), indent_collection])
        } catch (error) {
            res.json(error)
            return
        }
    }
    res.json({ code: result.code, data: {indent_collection} })
}