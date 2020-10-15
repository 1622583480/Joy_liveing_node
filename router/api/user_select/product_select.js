const { select_product } = require('../../../controls/user_select')
module.exports = async function (req, res) {
    const { keyword } = req.query
    if (typeof keyword == "undefined") {
        res.json({ code: 301 })
    }
    try {
        let result = await select_product({ keyword });
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}