const {all_coupon_sysytem} = require('../../../controls/coupon')
module.exports =async function(req,res){
    try {
        let result = await all_coupon_sysytem()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}