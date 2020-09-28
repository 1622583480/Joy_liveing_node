const { PRODUCT, PRODUCT_ID } = require('../../../controls/product')
module.exports = async function (req, res) {
    const { id } = req.query
    if (typeof id == "undefined") {
        try {
            let result = await PRODUCT()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    } else {
        try {
            let result = await PRODUCT_ID({ id })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }

}