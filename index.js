// 固有模块
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const io = require('socket.io')
const http = require('http')
// const fs = require('fs')

// 自定义配置文件或中间件
const checkToken = require('./middleware/checkToken')
const { port, upload } = require('./config/config')
const routes = require('./router')
const IOserver = require('./middleware/IO')

// 第三方中间件或配置
const cors = require('cors')
const Expformidable = require('express-formidable');
const { Submit } = require('./controls/Consulting_work');



// const credentials = {
//     pfx:  fs.readFileSync(path.join(__dirname, './keys/www.sngblog.cn.pfx')),
//     passphrase: "43u4h06mat2",
// }
const httpserver = http.createServer(app)
const IO = io(httpserver)
// 中间件或配置文件统一配置 
app.use('/', express.static(path.join(__dirname, './public/upload')))
app.use('/img', express.static(path.join(__dirname, './public/upload/img')))
app.use(IOserver(IO))
app.use(Expformidable(upload));
app.use(cors())
app.use(checkToken())
app.use('/api', routes)
// const httpsServer = https.createServer(credentials, app)
// 页面配置 


// console.log(IO)
app.use(router)

httpserver.listen(port)
let socket_userList = []; // 当前的用户列表 
let server_user = {}; // 工单 聊天信息 
IO.on('connection', function (socket) {
    socket.on('user_login', data => { // 用户进入页面
        let flag = true
        console.log(data)
        for (let i in server_user) {
            if (i == data.username) {
                socket.emit(`${data.username}old`, server_user[i].records); // 触发用户端 获取 之前工单的聊天记录
                return
            }
        }
        for (let i in socket_userList) {
            if (socket_userList[i] == data.username) {
                flag = false
                return
            }
        }
        if (flag) {
            socket_userList.push(data);
            server_user[data.username] = []; //否则初始化一个聊天工单 
            console.log(socket_userList, server_user)
            socket.broadcast.emit('server_userList', { data });
            // 且通知企业客服 进入了一个新的用户
        }
    })


    socket.on('user_send', (data) => { // 用户说话 
        server_user[data.username].push(data)
        socket.broadcast.emit('Server_back', data);
    });


    socket.on('server_sys', (data) => { // 客服说话 
        console.log(data)
        if (server_user[data.username]) {
            server_user[data.username].push(data)
            socket.broadcast.emit(data.username, data)
        } else {
            socket.emit('service_error', { message: "暂未查询到有此用户" })
        }
    })

    socket.on('user_sysList', data => {
        for (let i in server_user) {
            if (i == data.username) {
                socket.broadcast.emit('update_user_sysList', server_user[i]);
                return
            }
        }
    })

    socket.on('service_created', data => {
        if (socket_userList.length > 0) {
            Object.keys(server_user).forEach((item, index) => {
                console.log({ socket_userList, server_user: server_user[item] }, 'index')
                socket.emit('update_userList', { socket_userList, server_user: server_user[item] })
            })
        }
    })


    // socket.on('server_Submit',data=>{

    //     Submit({ username: data.username, content }).then(res => {
    //         if (res.code !== 204) {
    //             console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
    //         }
    //     })
    // })
    // 用户退出页面
    socket.on('user_outlogin', data => {
        let content = server_user[data.username]
        delete server_user[data.username]
        for (let i in socket_userList) {
            if (socket_userList[i].username == data.username) {
                socket_userList.splice(i, 1)
            }
        }
        Submit({ username: data.username, content }).then(res => {
            if (res.code !== 204) {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
                JSON.stringify
            }
        })
    })

});
// httpsServer.listen(port);
// application/x-www-form-urlencoded

// var a ={
//     username:"1212",
//     用户头像:"http://",
//     聊天信息:"",
//     时间戳:""
// } 