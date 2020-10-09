const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default
const axios = require('axios').default
// 初始化插件
const alipaySdk = new AlipaySdk({
    appId: '2016102500757494',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    privateKey: 'MIIEpQIBAAKCAQEA+5u6R/MBhEVt5xfXGlRWRIg4wz8hDY0Y4B4hWHa/6ibseX05OOiy/yewBkQSNCH5Uay+WQ0M+l8nJ5Bd7hHIEhCiPI9nOQ0BVjvBQBcdu88xWacKju5PC7qdTdc/WHSz9TuQ/b70OCcGtLuPOr3At1jeP84+MM5cEJY7V16meynAB22lZ/eabkfZoxDIibuleRV4V+Pn7xAikMGW4w8GlfdwiWIEM3z5nGkpPTYvt+wRBhEAHNim9e0eSGLV8lN8TfR1vydPmalt5fmnokBTUEMZM3pN1agF4FjgIrA23bXfkOomN3xlZcFPDgzYX0W8izYDQdKO9uc/5rtlyuBzGwIDAQABAoIBAQDvYG5u62xC+ocgOJdGjnxwwSU35MS+jsHe3+ubrYbS7+tFfnTFhuZdSNX4cCTdgoEgSnfiYz84qPSoeHpU+IffYAHqGgj7xzrBXyJxpkx8lRf/kqPB7ko3/3iPST0UHBvmMaC1OUpCbia8JkGTglpqVVtFWyPh7UK76SJV8k/zlZcXhhiBKGaXQGs2DiOIa5WXogp5RgLvqwprxOMWS380LeJP0hvAifsBEMjCriv5G6BqWfZ4zWCY7GYg7EWKsr8GgTNv7/+f8zfrj8d6Uug6og/uVojrjtD+WGl6Ci62A7gzOvwqcaD/U4nJ7QKj/Iaf1NufpyEZ/p9BAqbixXWxAoGBAP59r5R/aVy8g0meISiRo0uISuZnhWMQ5QoWZQCnqgHKkk3a52kU3o2y0CLqVpXMjbNodpgtadPQ/rvxxiUUgJqK3v2qtcuZ2jbW74FTJjQzrufUgR4909ejmoq5xXUErRtamjn0p7Gp16LWDCp1Y9TwIjeJxVMgpN3LSCwKSnyjAoGBAP0Zqn1SGn/2l9YZWklnjOTiOKqVrsQKcwlwcvOgKRrijjIIyLU/BdcKYAhwvkrbcaPk/jfrR0nbl/cdRenDvyin2Wfdk3OmdK/km4kSxBH1ZWnNq/aTW9RZPXdLBSNPaA1+Eoke9Z3K+pRz2oJ2SZLHWiehCBPvt2F46zOFpl8pAoGBALNKItewh68g1DGaKOwm5m9BPtth1TQ848+ehVvXw0rtxvL4pI2AeWZEsqPWileQu8fIcby2SddDZyNLqvfWoN+/tGfry5X79yMpe6SVytV+D9wd9zUyA7vo8+iGBllxiO87fmoUNcxRxqxetkV3XHTZFJIiCpWM6vmizF7ShTWXAoGALPvi0WNGUngBhIv9AA7ne8a5S5hO94jj6UmTJLnSlHSv0TS+d3g8EXxGlTl0mNln2TlZ9ZZblUTyPXl2c5XW4+LxQQSgsG1lT93RxwsOziJPY/6qEakfKR6zTgCHaT8zvzIpGTXncaQh5UCyFX3wlaXY4DI+vUxdy3UyWHXonAECgYEAvUU4LL6h+2My+wjCWUFye7vivix0iZMaIlxuiTUEKJDbMxSPQis/8omx2dagrX2XzS4LNhG0c/8jLFr9mD6szAy3+zdyi94j/EirxpGxDcyQ4l13M3jQThU00kqWv7045/8sPNhMDBN5thvZCLTAF6vmotY1D8lZDdnKcXsTWqo=',
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+5u6R/MBhEVt5xfXGlRWRIg4wz8hDY0Y4B4hWHa/6ibseX05OOiy/yewBkQSNCH5Uay+WQ0M+l8nJ5Bd7hHIEhCiPI9nOQ0BVjvBQBcdu88xWacKju5PC7qdTdc/WHSz9TuQ/b70OCcGtLuPOr3At1jeP84+MM5cEJY7V16meynAB22lZ/eabkfZoxDIibuleRV4V+Pn7xAikMGW4w8GlfdwiWIEM3z5nGkpPTYvt+wRBhEAHNim9e0eSGLV8lN8TfR1vydPmalt5fmnokBTUEMZM3pN1agF4FjgIrA23bXfkOomN3xlZcFPDgzYX0W8izYDQdKO9uc/5rtlyuBzGwIDAQAB'
})
async function pay(params) {
    const formData = new AlipayFormData()
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get')
    // 配置回调接口
    formData.addField("notifyUrl", "https://www.sngblog.cn:7147/api/slect_pay_order")
    // 设置参数
    formData.addField('bizContent', {
        outTradeNo: params.detailid,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '0.01',
        subject: '商品',
        body: '商品详情',
    });
    // 请求接口
    const result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData },
    );

    // result 为可以跳转到支付链接的 url
    return result
}
async function slect_pay_order(params) {
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('bizContent', {
        outTradeNo: params.detailid,
    })
    const result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData ,validateSign: true},
        
    ).then(result => {
        if (result) {
            axios.get(result).then(({data}) => {
                console.log(data)
            })
        } 
    }).catch(error => {

        console.log(error, '我走了catch')
    })
}
module.exports = {
    pay,
    slect_pay_order
}

