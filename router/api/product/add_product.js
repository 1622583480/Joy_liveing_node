const { upfile } = require('../../../config/config')
const { add_product } = require('../../../controls/product')
module.exports = async function (req, res) {
    let { title, price, img_list, introduce, parameter, type_one, type_two } = req.fields
    if (typeof title == "undefined" || typeof price == "undefined" || typeof img_list == "undefined" || typeof introduce == "undefined" || typeof type_one == "undefined" || typeof type_two == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    if (typeof parameter == "undefined") {
        parameter = JSON.stringify([])
    }
    try {
        let result = await add_product([title, price, img_list, introduce, parameter, type_one, type_two]);
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

// var a = {
//     title: '塔瓦',
//     price: 799,
//     img_list: ["https://www.ikea.cn/cn/zh/images/products/tarva-bed-frame__0655004_PE708894_S5.JPG?f=s", "https://www.ikea.cn/cn/zh/images/products/tarva-bed-frame__0860734_PE663225_S5.JPG?f=s", "https://www.ikea.cn/cn/zh/images/products/tarva-bed-frame__0860730_PE566702_S5.JPG?f=s", "https://www.ikea.cn/cn/zh/images/products/tarva-bed-frame__0368084_PH106085_S5.JPG?f=s", "https://www.ikea.cn/cn/zh/images/products/tarva-bed-frame__0782044_PE761036_S5.JPG?f=s"],
//     introduce: `TARVA 塔瓦 床架是具有现代特色的斯堪的纳维亚传统家具，此类家具一直采用简洁的设计风格，并由未经处理的木材制作而成。
//     这款产品设计经典，可与其他各类家具和谐搭配。`,
//     parameter: '',
//     type_one: '床',
//     type_two: '单人床'
// }

