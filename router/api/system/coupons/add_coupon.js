const { add_coupon } = require('../../../../controls/system_coupon/coupon')
module.exports = async function (req, res) {
    const { title, timer, price, integral } = req.fields
    if (typeof title == "undefined" || typeof timer == "undefined" || typeof price == "undefined" || typeof integral == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await add_coupon([title, new Date().getTime(), timer, price, integral])
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}