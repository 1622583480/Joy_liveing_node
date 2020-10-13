const { user_spike } = require('../../../controls/special_spike')
module.exports = async function (req, res) {
    const { type } = req.fields
    if (type == "spike" || type == "special") {
        try {
            let result = await user_spike({ type })
            result.json(result)
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json({ code: 302 })
    }
}