const { refund_indent } = require("../../../controls/indent")

module.exports =async function (req, res) {
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
    const { detailid } = req.fields
    if (typeof detailid == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {
        let result = await refund_indent({ username: req.tokenstate.content.username, detailid })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}