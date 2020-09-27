const { DELETE_ADDRESS } = require('../../../controls/address')

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
    const { index } = req.fields
    if (typeof index == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {
        DELETE_ADDRESS({ username: req.tokenstate.content.username }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });

    } catch (error) {

    }
}