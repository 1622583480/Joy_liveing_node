const express = require('express');
const router = express.Router();

const User_Register = require('./api/User/register.js');
const User_Login = require('./api/User/login.js');
const User_Info = require('./api/User/userinfo.js');
const Update_Profile = require('./api/User//UpdateProfile.js');

const Forgetpass = require('./api/User/forgetpass.js');
const Forgetemail = require('./api/email/forgetemail.js');
const SMS = require('./api/email/SMS')
const Eamil = require('./api/email/emali');
const files = require('./api/files/files')

const addaddress = require('./api/address/add_address');
const alladdress = require('./api/address/all_address');
const deleteaddress = require('./api/address/delete_address');
const reviseaddress = require('./api/address/revise_address');

const all_product = require('./api/product/all_product')
const add_product = require('./api/product/add_product')
const detele_product = require('./api/product/detele_product')
const type_one = require('./api/product/type_one')
const resvise_product = require('./api/product/resvise_product')

const userlist = require('./api/system/userList')
const all_indent = require('./api/system/all_indent')

const add_indent = require('./api/indent/add_indent')
const receipt_indent = require('./api/indent/Receipt_indent')
const pay_indent = require('./api/indent/payindent')

// const pay = require('./api/zfbpay/pay');
// const selectpay = require('./api/zfbpay/selectpay.js');
// const paysuccess = require('./api/zfbpay/paysuccess');

const all_coupon = require('./api/system/coupons/all_coupon')
const add_coupon = require('./api/system/coupons/add_coupon')
const delete_coupon = require('./api/system/coupons/delete_coupon')


router.post('/user/register', User_Register); //注册
router.post('/user/login', User_Login); // 登录
router.post('/user/userinfo', User_Info); // 获取一个用户的全部信息
router.post('/user/updateprofile', Update_Profile);  //更新用户的资料 
router.post('/email', Eamil); // 发送一个邮件
router.post('/user/forgetpass', Forgetpass);  //修改一个密码和忘记密码
router.post('/user/forgetemail', Forgetemail); // 更新邮箱
router.post('/sms', SMS); //解析一个邮件
router.post('/file',files); //上传一个文件返回文件名地址


//  用户的收货地址的增删改查
router.post('/add_address', addaddress)
router.post('/all_address', alladdress)
router.post('/delete_address', deleteaddress)
router.post('/revise_address', reviseaddress)


// 商品的全部商品 根据type_one id page 获取商品 
router.get('/all_product', all_product)
router.post('/add_product', add_product)
router.get('/detele_product', detele_product) 
router.get('/type_one', type_one)
router.get('/resvise_product', resvise_product)




// 获取用户列表 获取所有的订单
router.get('/system/user_list', userlist)
router.get('/system/all_indent', all_indent)


// 增加订单 订单支付 订单确认收货
router.post('/add_indent', add_indent)
router.post('/pay_indent', pay_indent)
router.post('/receipt_indent', receipt_indent)



// router.post('/zfbpay', pay)
// router.post('/zfsuccess', paysuccess)
// router.post('/selectpay', selectpay)


// 优惠券的增删改
router.get('/all_coupon',all_coupon)
router.post('/add_coupon',add_coupon)
router.get('/delete_coupon',delete_coupon)
// {
//     "用户ID":{
//         "客服ID":{
//             text:"聊天内容"
//         },
//         "客服ID":{
//             text:"聊天内容"
//         },
//         "客服ID":{
//             text:"聊天内容"
//         },
//         用户ID:{
//             text:"聊天内容"
//         }，
//         "客服ID":{
//             text:"聊天内容"
//         },
//         用户ID:{
//             text:"聊天内容"
//         }
//     },
//     "第二个用户ID":{
//         "客服ID":{
//             text:"聊天内容"
//         },
//         用户ID:{
//             text:"聊天内容"
//         }
//     }
// }




module.exports = router