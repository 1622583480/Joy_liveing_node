const { initialize_indent, randomNumber, update_user_coupon } = require('../../../controls/indent');
const { delete_shopcar } = require('../../../controls/shopcar');
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
    var { goodsid, num, parameter, postscript, address, coupon, all_price, detail_id } = req.fields;
    if (typeof goodsid == 'undefined' || typeof num == "undefined" || typeof all_price == "undefined") {
        res.json({ code: 301 })
        return
    }
    if (!(Array.isArray(goodsid) && Array.isArray(num) && Array.isArray(parameter))) {
        goodsid = JSON.parse(goodsid)
        parameter = JSON.parse(parameter)
        num = JSON.parse(num)
    }
    if (!(typeof detail_id == "undefined")) {
        if (!(Array.isArray(detail_id))) {
            detail_id = JSON.parse(detail_id)
        }
    } else {
        detail_id = []
    }
    let indent_collection = null; // 生成一个 订单集合
    let indentlength = null; // 监听所有商品的长度 
    let result = { code: 302 }; // 状态码
    for (let i in detail_id) {
        delete_shopcar({ username: req.tokenstate.content.username, delete_id: detail_id[i] })
    }
    if (typeof coupon == "undefined" || typeof coupon === null) {
        coupon = null
    }
    if ((goodsid.length == parameter.length) && (goodsid.length == num.length)) {
        indentlength = goodsid.length
    }
    try {
        let coupon_result = await update_user_coupon({ username: req.tokenstate.content.username, coupon })
        if (coupon_result.code !== 204) {
            res.json({ code: 414, data: { indent_collection } })
            return
        }
    } catch (error) {
        res.json(error)
        return
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
            result = await initialize_indent([random, '待付款', goodsid[i], num[i], new Date().getTime(), req.tokenstate.content.username, parameter[i], postscript, JSON.stringify(address), JSON.stringify(coupon), indent_collection, all_price])
        } catch (error) {
            res.json(error)
            return
        }
    }

    res.json({ code: result.code, data: { indent_collection } })
}