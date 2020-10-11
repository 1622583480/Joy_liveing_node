const { system_product } = require('../../../../controls/system/product')
module.exports = async function (req, res) {
    const { productid, type_one, product_title } = req.fields
    if (typeof type_one == "undefined" || typeof product_title == "undefined" || typeof product_title == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await system_product([productid, product_title, type_one])
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}