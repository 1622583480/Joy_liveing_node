const { PRODUCT, PRODUCT_ID } = require('../../../controls/product')
module.exports = async function (req, res) {
    const { id } = req.query
    if (typeof id == "undefined") {
        try {
            let result = await PRODUCT()
            console.log(result)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    } else {
        try {
            let result = await PRODUCT_ID({id})
            console.log(result)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }

}