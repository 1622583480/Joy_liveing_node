const { UserLogin } = require('../../../controls/UserSql')
module.exports = function (req, res) {
    let { username, password } = req.fields
    if (typeof username === 'undefined' || typeof password === 'undefined') {
        res.json({
            code: 301,
        })
        return
    }
    try {
        UserLogin([username, password], (result) => {
            res.json(result)
            return
        })
    } catch (error) {
        res.json({ error })
    }
}
