const { UserInfo } = require('../../../controls/UserSql')
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
    UserInfo([req.tokenstate.content.username], (result) => {
        const { username, name, email, headpoto, synopsis, uuid, gender, datebirth, integral } = result.data
        res.json({ code:result.code, data: {username, name, email, headpoto, synopsis, uuid, gender, datebirth, integral } })
    })
}
