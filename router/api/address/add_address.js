const { ADD_ADDRESS } = require('../../../controls/address')


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
    const { province, city, area, address, recipients, tel } = req.fields
    if (typeof province == 'undefined' || typeof city == 'undefined' || typeof area == 'undefined' || typeof address == 'undefined' || typeof recipients == 'undefined' || typeof tel == 'undefined') {
        res.json({
            code: 301
        })
        return
    }
    try {
        ADD_ADDRESS({ username: req.tokenstate.content.username, address: { province, city, area, address, recipients, tel } }).then(result => {
            res.json(result)
        })
    } catch (error) {
        console.log(error)
    }
}