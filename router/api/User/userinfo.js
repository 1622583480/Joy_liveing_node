const { UserInfo } = require('../../../controls/UserSql')
const jwt = require('jsonwebtoken')
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
    UserInfo([req.tokenstate.content.username], (result) => {
        res.json(result)
    })
}
