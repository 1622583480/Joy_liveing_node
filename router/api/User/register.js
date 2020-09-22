const { UserAddUser } = require('../../../controls/UserSql')

module.exports = function register(req, res) {
    let { username, password } = req.fields
    if (typeof username === 'undefined' || typeof password === 'undefined') {
        res.json({
            code: 301,
        })
        return
    }
    try {
        UserAddUser([username, password], (result) => {
            res.json(result)
            return
        })
    } catch (error) {
        res.json({ error })
    }
}
