const { active_indents } = require('../../../controls/indent')
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
    const { indent_collection } = req.fields
    if (typeof indent_collection == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {
        let result = await active_indents(['交易完成', req.tokenstate.content.username, indent_collection])
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}