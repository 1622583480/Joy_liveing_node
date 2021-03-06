const { exchange } = require('../../../controls/coupon')
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
    const { _id } = req.fields
    try {
        let couponobj = {}
        couponobj.createtimer = new Date().getTime();
        let result = await exchange({ _id, username: req.tokenstate.content.username, couponobj })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}