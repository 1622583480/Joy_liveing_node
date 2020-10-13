const { system_spike } = require('../../../../controls/special_spike')
module.exports = async function (req, res) {
    const { Productobj } = req.fields
    if (Productobj.type == "spike" || Productobj.type == "special") {
        try {
            let result = await system_spike({ type: Productobj.type, id: Productobj.id })
            res.json(result)
            return
        } catch (error) {
            res.json(error)
            return
        }
    } else {
        res.json({ code: 302 })
    }
}