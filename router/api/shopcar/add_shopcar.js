const { add_shopcar } = require('../../../controls/shopcar.js')
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
    const { id, num, parameter_index, title, price, parameter } = req.fields
    if (typeof id == "undefined" || typeof num == "undefined" || typeof parameter == "undefined" || typeof price == "undefined" || typeof title == "undefined" || typeof parameter_index == "undefined") {
        res.json({ code: 301 })
    }
    try {
        let result = await add_shopcar({price, id, num, parameter,parameter_index, title, username: req.tokenstate.content.username })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

// var a = [{ id: "1", num: 5, parms: 0 }]

// [
//     { name: '颜色', content: [], },
//     { name: '尺寸' }
// ]