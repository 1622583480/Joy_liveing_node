const { amend_shopcar } = require('../../../controls/shopcar')
module.exports = async function (req, res) {
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

    try {
        let result = await amend_shopcar()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
function 输出语句(name) {
    console.log(name);
}

输出语句('AAAAA')