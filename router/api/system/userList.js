const { user_page_list, userlist } = require('../../../controls/system.js')
module.exports = async function (req, res) {
    const { page } = req.query
    if (typeof page == "undefined") {
        try {
            let result = await userlist()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    try {
        let result = await user_page_list({ page })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
} 
// 修改用户信息 商品增删改查 订单的改查



// 用户查询
// 优惠券增删改查
// 客服模块 