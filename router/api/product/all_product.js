const { PRODUCT, PRODUCT_ID, PRODUCT_PAGE } = require('../../../controls/product')
module.exports = async function (req, res) {
    const { id, page } = req.query
    if (typeof id == "undefined" && typeof page == "undefined") {
        try {
            let result = await PRODUCT()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    if (typeof id == "undefined" && typeof page !== "undefined") {
        try {
            console.log('走了第二个')
            let result = await PRODUCT_PAGE({ page })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    if (typeof page == "undefined" && typeof id !== "undefined") {
        try {
            let result = await PRODUCT_ID({ id })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }


}