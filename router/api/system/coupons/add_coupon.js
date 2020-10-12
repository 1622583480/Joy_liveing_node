
const { add_coupon } = require('../../../../controls/system/coupon')
module.exports = async function (req, res) {
    const { title, timer, price, integral, remark, Preferential } = req.fields
    if (typeof title == "undefined" || typeof timer == "undefined" || typeof price == "undefined" || typeof remark == "undefined" || typeof integral == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let _id_value = _id()
        console.log(_id_value)
        let result = await add_coupon([title, new Date().getTime(), timer, price, integral, remark, _id_value, Preferential])
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
function _id() {
    let _id = ""
    let original_id = String(parseInt(new Date().getTime() / 5 * 1.3 + 10086 * 1.9 / 97 * 51 * 10))
    const MathX = Math.random().toFixed(3).slice(-3);
    _id += parseInt(original_id.substring(0, MathX[0])) > parseInt(original_id.substring(MathX[0])) ? original_id.substring(0, MathX[0]) : original_id.substring(MathX[0])
    _id += parseInt(original_id.substring(MathX[2], 0)) > parseInt(original_id.substring(MathX[2])) ? original_id.substring(MathX[2], 0) : original_id.substring(MathX[2])
    if (_id[0] == '0') {
        _id[0] == 5
    }
    return _id.slice(0,8)
}