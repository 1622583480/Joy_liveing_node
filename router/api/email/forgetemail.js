const { emailserver } = require("../../../config/config")
const { upemail } = require('../../../controls/emali')

module.exports = function (req, res) {
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
    const { newemail, code, type } = req.fields
    if ((newemail == 'undefined' || code == 'undefined' || type == 'undefined')) {
        res.json({
            code: 301
        })
    }
    emailserver.Verification_code_analysis({ email: newemail, type, code }).then(async result => {
        if (result.code == 204) {
            try {
                let results =await upemail({ email: newemail, username: req.tokenstate.content.username })
                res.json(results)
                return
            } catch (error) {
                res.json(error)
            }
        }
    }).catch(err => {
        res.json(err)
    })

}