const { updateuser } = require('../../../controls/system')
module.exports = async function (req, res) {
    const { uuid, newpass } = req.fields
    if (typeof uuid == "undefined" || typeof newpass == "undefined") {
        res.json({ code: 301 })
        return
    }
    try {
        let result = await updateuser({ uuid, newpass })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}