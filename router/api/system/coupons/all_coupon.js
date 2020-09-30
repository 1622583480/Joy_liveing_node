const { all_coupon } = require('../../../../controls/system_coupon/coupon')
module.exports = async function (req, res) {
    try {
        let result = await all_coupon()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
    
}