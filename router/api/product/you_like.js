const { like } = require("../../../controls/like")

module.exports = async function (req, res) {
    try {
        let result = await like()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}