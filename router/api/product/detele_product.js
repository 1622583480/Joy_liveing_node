const { DELECT_PRODUCT } = require('../../../controls/product')
module.exports = async function (req, res) {
    const { index } = req.query
    if (typeof index == 'undefined') {
        res.json({
            code: 301
        })
        return
    }
    try {
        let result = await DELECT_PRODUCT({ index })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}