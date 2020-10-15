const { edit_product } = require('../../../controls/system/product')
module.exports = async function (req, res) {
    // const { title, price, img_list, introduce, parameter } = req.fields
    let result = { code: 414 }
    let params = req.fields
    if (typeof params.id == "undefined") {
        res.json({ coode: 302 })
    }
    for (let i in params) {
        params[i] = JSON.parse(params[i])
        if (params.img_list == '') {
            params.img_list = JSON.stringify([])
        }
    }
    for (let i in params) {

        try {
            result = await edit_product({ key: i, value: params[i], id: params.id })
        } catch (error) {
            res.json(error)
        }
    }
    res.json(result)
}