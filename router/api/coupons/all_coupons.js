const { Get_user_coupon } = require('../../../controls/coupon')
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
        let result = await Get_user_coupon({ username: req.tokenstate.content.username })
        res.json({ code: 204, data: result })
    } catch (error) {
        res.json({ code: 414, data: error })
    }
}