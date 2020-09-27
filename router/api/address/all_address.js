const { ALL_ADDRESS } = require('../../../controls/address')
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

        let addressList = await ALL_ADDRESS({ username: req.tokenstate.content.username })
        res.json({ code: 204, data: addressList })

    } catch (error) {
        res.json(addressList)
    }
}