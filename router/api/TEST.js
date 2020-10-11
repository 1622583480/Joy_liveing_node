const { processing } = require("../../controls/UserSql")
const { Get_Coupon } = require("../../controls/coupon")
module.exports = async function (req, res) {
    try {
        Get_
        let result = await Get_Coupon(req.fields)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
