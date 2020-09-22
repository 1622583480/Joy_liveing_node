const express = require('express')
const router = express.Router();

const User_Register = require('./api/User/register.js')
const User_Login = require('./api/User/login.js')
const User_Info = require('./api/User/userinfo.js')
const Update_Profile = require('./api/User//UpdateProfile.js')




router.post('/register', User_Register)
router.post('/login', User_Login)
router.post('/userinfo', User_Info)
router.post('/updateprofile', Update_Profile)
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