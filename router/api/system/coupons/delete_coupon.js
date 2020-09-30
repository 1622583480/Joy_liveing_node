const { detele_coupon } = require('../../../../controls/system_coupon/coupon')
module.exports = async function (req, res) {
    const { detailid } = req.fields
    if (typeof detailid == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await detele_coupon({ detailid })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}