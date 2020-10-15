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

const token = require(
    './token_code/token'
);
const add_shopcar = require('./api/shopcar/add_shopcar.js');
const detele_shopcar = require('./api/shopcar/delete_shopcar.js')
const all_shopcar = require('./api/shopcar/all_shopcar')
const update_shopcar = require('./api/shopcar/update_shopcar')

const select_indent = require('./api/system/select/select_indent')
const select_user = require('./api/system/select/select_user')



const updateuser = require('./api/system/updateuser');
const select_product = require('./api/system/select/select_product.js');

const User_all_indent = require('./api/indent/select_indent/all_order');
const unpaid = require('./api/indent/select_indent/Unpaid');
const delivered = require('./api/indent/select_indent/delivered');
const received = require('./api/indent/select_indent/received');
const comment = require('./api/indent/select_indent/comment');


const add_collect = require('./api/collect/add_collect.js');
const all_collect = require('./api/collect/all_collect.js');
const delete_collect = require('./api/collect/delete_collect.js');


const select_pay = require('./api/indent/select_pay.js');


const exchange = require('./api/coupons/exchange.js');

const TEST = require('./api/TEST.js');


const user_all_coupon = require('./api/coupons/all_coupons');
const refund_indent = require('./api/indent/refund_indent.js');
const all_system_coupon = require('./api/coupons/all_system_coupon');
const edit_Product = require('./api/system/edit_Product.js');
const all_integral = require('./api/rests/all_integral.js');
const product_select = require('./api/user_select/product_select.js');
const spike = require('./api/Spike_special/spike.js');
const systemspike = require('./api/system/Spike_special/spike.js');
const service = require('./api/service/service.js');
const you_like = require('./api/product/you_like.js');
const edit_indent = require('./api/system/edit_indent.js');
const deliver_indent = require('./api/system/deliver_indent.js');
// 测试通过==================> 用户各种杂七杂八操作
router.post('/user/register', User_Register); //注册
router.post('/user/login', User_Login); // 登录
router.post('/user/userinfo', User_Info); // 获取一个用户的全部信息
router.post('/user/updateprofile', Update_Profile);  //更新用户的资料 
router.post('/email', Eamil); // 发送一个邮件
router.post('/user/forgetpass', Forgetpass);  //修改一个密码和忘记密码
router.post('/user/forgetemail', Forgetemail); // 更新邮箱
router.post('/sms', SMS); //解析一个邮件
router.post('/file', files); //上传一个文件返回文件名地址


//  用户的收货地址的增删改查
router.post('/add_address', addaddress)
router.post('/all_address', alladdress)
router.post('/delete_address', deleteaddress)
router.post('/revise_address', reviseaddress)


// 商品的全部商品 根据type_one id page 获取商品  删除商品
router.get('/all_product', all_product)
router.post('/add_product', add_product)
router.get('/delete_product', detele_product); // 后台用
router.get('/type_one', type_one) 


router.post('/token', token); //token 验证接口


// 获取用户列表 获取所有的订单
router.get('/system/user_list', userlist)
router.get('/system/all_indent', all_indent)

// 修改用户个人密码
router.post('/system/updateuser', updateuser)



// 条件获取用户 用于搜索接口
router.post('/system/select_user', select_user)
// 条件获取订单 用于搜索
router.post('/system/select_indent', select_indent)

// 后台搜索商品
router.post('/system/select_product', select_product)

// 增加订单 订单支付 订单确认收货
router.post('/add_indent', add_indent); //新增订单
router.post('/pay_indent', pay_indent); // 订单支付
router.post('/refund_indent', refund_indent) // 取消订单




router.post('/select_pay', select_pay); //搜索订单
// 确认收货交易完成
router.post('/receipt_indent', receipt_indent)

// 优惠券的增删改
router.get('/all_coupon', all_coupon)
router.post('/add_coupon', add_coupon)
router.get('/delete_coupon', delete_coupon)

// 测试通过==================> 增删改查购物车 
router.post('/user/add_shopcar', add_shopcar)
router.post('/user/delete_shopcar', detele_shopcar)
router.post('/user/all_shopcar', all_shopcar)
router.post('/user/update_shopcar', update_shopcar)

// 获取订单状态
router.post('/user/all_indent', User_all_indent); //所有订单
router.post('/user/unpaid', unpaid); //待付款
router.post('/user/delivered', delivered); // 待发货
router.post('/user/received', received); // 待收货
router.post('/user/comment', comment); // 待评价


// 用户端收藏夹的增删查
router.post('/user/add_collect', add_collect)
router.post('/user/all_collect', all_collect)
router.post('/user/delete_collect', delete_collect)


// 用户兑换优惠券
router.post('/user/exchange', exchange); // 优惠券兑换
router.get('/user/all_coupon', user_all_coupon); //获取当前所有的优惠券


router.get('/all_system_coupon', all_system_coupon); //后台获取所有的订单 
router.post('/system/edit_product', edit_Product); // 系统编辑商品


// 积分接口
router.get('/all_integral', all_integral); // 用户获取积分

router.get('/user/select_product', product_select); //用户搜索商品

router.get('/spike',spike); // 获取活动商品 闪购 特价


router.post('/system/spike',systemspike); //系统获取商品 

router.get('/like',you_like); //猜你喜欢 


router.post('/system/edit_indent',edit_indent);  //修改订单
router.post('/system/deliver_indent',deliver_indent); // 后台发货接口 

module.exports = router
