const { resvise_product } = require('../../../controls/product')
module.exports = async function (req, res) {
    const product = req.fields
    for (let i in product) {
        
    }
    try {
        let result = await resvise_product()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}