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

const addaddress = require('./api/address/add_address');
const alladdress = require('./api/address/all_address');
const deleteaddress = require('./api/address/delete_address');
const reviseaddress = require('./api/address/revise_address');

const all_product = require('./api/product/all_product')
const add_product = require('./api/product/add_product')
const detele_product = require('./api/product/detele_product')
const type_one = require('./api/product/type_one')
const resvise_product = require('./api/product/resvise_product')

const admin_login = require('./api/system/systemlogin')
const userlist = require('./api/system/userList')

const add_indent = require('./api/indent/add_indent')
const receipt_indent = require('./api/indent/Receipt_indent')
const pay_indent = require('./api/indent/payindent')

router.post('/user/register', User_Register);
router.post('/user/login', User_Login);
router.post('/user/userinfo', User_Info);
router.post('/user/updateprofile', Update_Profile);
router.post('/email', Eamil);
router.post('/user/forgetpass', Forgetpass);
router.post('/user/forgetemail', Forgetemail);
router.post('/sms', SMS);

router.post('/add_address', addaddress)
router.post('/all_address', alladdress)
router.post('/delete_address', deleteaddress)
router.post('/revise_address', reviseaddress)


router.get('/all_product', all_product)
router.post('/add_product', add_product)
router.get('/detele_product', detele_product)
router.get('/type_one', type_one)
router.get('/resvise_product', resvise_product)
// router.post('/forgetpass', Forgetpass)



router.post('/system/login', admin_login)
router.get('/system/user_list',userlist)

router.post('/add_indent',add_indent)
router.post('/pay_indent',pay_indent)
router.post('/receipt_indent',receipt_indent)

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