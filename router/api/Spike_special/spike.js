const { user_spike } = require('../../../controls/special_spike')
module.exports = async function (req, res) {
    const { type } = req.query;
    if (type == "spike" || type == "special") {
        try {
            let result = await user_spike({ type })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json({ code: 302 })
    }
}