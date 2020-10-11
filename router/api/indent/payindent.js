const { indent_order } = require('../../../controls/indent')
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
    const { indent_collection } = req.fields
    if (typeof indent_collection == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    try {
        let result = await indent_order({ order: '待发货', username: req.tokenstate.content.username, indent_collection })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
/*
    `
                                                                                                                (封装商品处理模块)                                           (封装支付模块)
后端生成多个订单===> 前端获取到订单之后调用支付====> 传入订单号数组=====> 接收订单号数组====> 判断长度如果是单个↓↑ 否则=>> 就是多个商品一同结算 获取多个商品数据 title price 等↑  统一标题 价格合并 统一支付 ===> 多个订单的商品 统一修改已支付
                                                                                                            获取单个订单商品 price title ===> 设置商品参数===> 返回订单链接 扫码后了轮询自己的接口 ===> 判断是否支付成功↓否则=>> 支付失败不修改数据库数据 ====> 给前端返回414,不同状态码
                                                                                                                                                                                                                    修改数据库参数===> 修改之后 给予前端返回204                          `
                                                                                                                                                                                                                    */
