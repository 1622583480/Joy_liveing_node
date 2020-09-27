const { emailserver } = require("../../../config/config")
const { SMS } = require('../../../controls/emali.js')
module.exports = function (req, res) {
    const { email, code, type } = req.fields

    emailserver.Verification_code_analysis({ email, code, type }).then(async result => {
        if (result.code == 204) {
            try {
                let result = await SMS({email})
                res.json(result)
            } catch (error) {
                res.json(error)
            }
        }
    }).catch((err) => {
        res.json(err)
    })
}