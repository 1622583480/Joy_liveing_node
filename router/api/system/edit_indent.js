const {system_edit_address} = require('../../../controls/indent')
module.exports =async function (req, res) {
    const { address,indent_collection } = req.fields
    if(typeof address =="undefined" || typeof indent_collection == "undefined"){
        res.json({code:301})
        return 
    }
    try {
        let result = await system_edit_address({address,indent_collection})
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}