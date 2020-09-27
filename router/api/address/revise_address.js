const { REVISE_ADDRESS } = require('../../../controls/address')
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
    const { province, city, area, address, recipients, tel, index } = req.fields
    if (typeof province == 'undefined' || typeof city == 'undefined' || typeof area == 'undefined' || typeof address == 'undefined' || typeof recipients == 'undefined' || typeof tel == 'undefined' || typeof index == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {
        REVISE_ADDRESS({ username: req.tokenstate.content.username,index, address: { province, city, area, address, recipients, tel } }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    } catch (error) {

    }
}