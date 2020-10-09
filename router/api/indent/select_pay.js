const { slect_pay_order } = require('../../../controls/pay')

module.exports = async function (req, res) {
    console.log(req.fields)
    try {
        let result = await slect_pay_order({ detailid })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}