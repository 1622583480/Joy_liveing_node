const { slect_pay_order } = require('../../../controls/pay')

module.exports = async function (req, res) {
    try {
        let result = await slect_pay_order(req.fields)
        console.log(result)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

var a = {
    gmt_create: '2020-10-10 09:33:25',
    charset: 'utf-8',
    gmt_payment: '2020-10-10 09:33:34',
    notify_time: '2020-10-10 09:33:35',
    subject: '乐居生活官方商品支付',
    sign: 'U4p+5rghq8G9ncfvqqDMP9Du1xMbfBaf7qG+OMgZpR8IcAb8I4nBlTkhxmNPQlAKpV/d3kDPaXIkDWh50lJq0bUxY3+b8Kn/WNVQvoa4CjK2GYf+iLQz4llNHovE3NNs/OkS0BaQSX3nTDLArLJ1YjHUZ414idEfYUTNaCZ1kPIACWfN1ntKkCZ2nQUu1TtC2nvLHDX7Yd8454GDCj/76mboD7fEZ97PFol8y3LYAF67sUGypqe6+QQwKxmga++6hNLkJhBhkmh4gXJNwmfh7fgYXbCRXAaJPNclH87XbYUSUO5AOKmUjKDEuR53/MkI128Gmda9PVN9GGPUpizrtQ==',
    buyer_id: '2088622954743963',
    body: '斯莱克、',
    invoice_amount: '1996.00',
    version: '1.0',
    notify_id: '2020101000222093335043960509184286',
    fund_bill_list: '[{"amount":"1996.00","fundChannel":"ALIPAYACCOUNT"}]',
    notify_type: 'trade_status_sync',
    out_trade_no: '20201010093121980337',
    total_amount: '1996.00',
    trade_status: 'TRADE_SUCCESS',
    trade_no: '2020101022001443960501209954',
    auth_app_id: '2016102500757494',
    receipt_amount: '1996.00',
    point_amount: '0.00',
    app_id: '2016102500757494',
    buyer_pay_amount: '1996.00',
    sign_type: 'RSA2',
    seller_id: '2088102181006151'
}                                                                                                                                                                                                                                                                                                                                                                                                                                 