const { add_coupon } = require('../../../../controls/system/coupon')
module.exports = async function (req, res) {
    const { title, timer, price, integral,remark } = req.fields
    if (typeof title == "undefined" || typeof timer == "undefined" || typeof price == "undefined" || typeof remark == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await add_coupon([title, new Date().getTime(), timer, price, integral,remark])
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}