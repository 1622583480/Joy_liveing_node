const { add_collect } = require('../../../controls/collect')
module.exports = async function (req, res) {
    if (req.tokenstate.tokenCode == 401) {
        res.json({
            code: 401
        })
        return
    }
    if (req.tokenstate.tokenCode == 402) {
        res.json({
            code: 402
        })
        return
    }
    if (typeof req.tokenstate.tokenCode == 'undefined') {
        res.json({
            code: 301
        })
        return
    }
    const { product_id } = req.fields
    if (typeof product_id == "undefined") {
        res.json({
            code: 301
        })
    }
    try {
        let result = await add_collect({ product_id, username: req.tokenstate.content.username })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}