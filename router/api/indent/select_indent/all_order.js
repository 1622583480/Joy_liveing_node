const { all_indent } = require('../../../../controls/user_select_indent')
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
    try {
        let result = await all_indent({ username: req.tokenstate.content.username })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}