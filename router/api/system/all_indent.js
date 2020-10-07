const { all_indent, page_indent } = require('../../../controls/indent')
module.exports = async function (req, res) {
    const { page } = req.query
    if (typeof page == "undefined") {
        try {
            let result = await all_indent()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    try {
        let result = await page_indent({ page })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}