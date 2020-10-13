const { delete_coupon } = require('../../../../controls/system/coupon')
module.exports = async function (req, res) {
    const { _id } = req.query
    if (typeof _id == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await delete_coupon({ _id })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}