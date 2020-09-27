const { UserAddUser } = require('../../../controls/UserSql')
const { emailserver } = require('../../../config/config')
module.exports = function register(req, res) {
    let { username, password, email, code } = req.fields
    if (typeof username === 'undefined' || typeof password === 'undefined' || typeof email === "undefined" || typeof code === "undefined") {
        res.json({
            code: 301,
        })
        return
    }

    emailserver.Verification_code_analysis({ email, code, type: 'register' }).then(result => {
        if (result.code == 204) {
            try {
                UserAddUser([username, password, email], (results) => {
                    res.json(results)
                    emailserver.Verification_code_delete(email, code, 'register')
                    return
                })
            } catch (error) {
                res.json({ error })
            }
        }
    }).catch((err) => {
        res.json(err)
    })

}
