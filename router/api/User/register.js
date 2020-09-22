const { UserAddUser } = require('../../../controls/UserSql')

module.exports = function register(req, res) {
    let { UserName, Password } = req.fields
    if (typeof UserName === 'undefined' || typeof Password === 'undefined') {
        res.json({
            code: 501,
        })
        return
    }
    try {
        UserAddUser([UserName, Password], (result) => {
            res.json(result)
            return
        })
    } catch (error) {
        res.json({ error })
    }
}
