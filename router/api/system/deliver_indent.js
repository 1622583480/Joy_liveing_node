const {system_edit_address} = require('../../../controls/indent')
module.exports =async function (req, res) {
    const { waybill,detailid } = req.fields
    if(typeof waybill =="undefined" || typeof detailid == "undefined"){
        res.json({code:301})
        return 
    }
    try {
        let result = await system_edit_address({orderstatus:"待收货",waybill,detailid})
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}