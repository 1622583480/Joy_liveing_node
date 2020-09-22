const { UserLogin } = require('../../../controls/UserSql')
module.exports = function (req, res) {
    let { UserName, Password } = req.fields
    if (typeof UserName === 'undefined' || typeof Password === 'undefined') {
        res.json({
            code: 501,
        })
        return
    }
    try {

        UserLogin([UserName, Password], (result) => {
            res.json(result)
            return
        })
    } catch (error) {
        res.json({ error })
    }
}
