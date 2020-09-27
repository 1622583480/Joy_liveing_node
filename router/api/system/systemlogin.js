const { adminlogin } = require('../../../controls/system')
module.exports = async function (req, res) {
    const { username, password } = req.fields
    if (typeof username == "undefined" || typeof password == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await adminlogin({ username, password });
        res.json(result)
    } catch (error) {
        res.json(error)
    }

}