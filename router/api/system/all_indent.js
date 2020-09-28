const { all_indent } = require('../../../controls/indent')
module.exports = async function (req, res) {
    try {
        let result = await all_indent()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}