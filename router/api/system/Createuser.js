const { } = require('../../../controls/system')
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
    const { name, username, password, zoom } = req.fields
    if (typeof name == "undefined" || typeof username == "undefined" || typeof password == "undefined" || typeof zoom == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {

    } catch (error) {

    }
}
