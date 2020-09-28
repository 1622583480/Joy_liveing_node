const db = require('../config/db.js');
const jwt = require('jsonwebtoken');
const uid = require('node-uuid')
const { tokenKey } = require('../config/config')


// 通用的返回 减少代码冗余
function processing(params, sql, callback) {
    db.query(sql, params).then(res => {
        callback(res)
    }).catch(err => {
        callback(err)
    })
}
// 公用业务函数 ----> 查询用户是否存在
async function UserInquire(params, callback) {
    // 通过username 查询password 查询用户是否存在
    let sql = `select password from user where username=?;`;
    processing(params, sql, callback)
}
// register业务函数 ----> 用户存储新增一个用户
async function UserAddUser(params, callback) {
    UserInquire(params[0], (res) => {
        if (res.length > 0) {
            callback({
                code: 517
            })
            return
        }
        const emailsql = `select email from user where email=?;`
        processing(params[2], emailsql, (resultem) => {
            if (resultem.length > 0) {
                callback({
                    code: 204
                })
                return
            }

        })
        // 初始化sql语句 以及 初始化默认数据 
        const sql = `insert into user (username,password,email,userdate,uuid,gender,name) values (?,?,?,?,?,?,?)`
        const uuid = uid.v1()
        params.push(new Date().getTime())
        params.push(uuid)
        params.push('男')
        params.push(new Date().getTime() + 'LGSJ')
        // 初始化默认值
        processing(params, sql, () => {
            callback({
                code: 204
            })
        })
    })
}
// login业务函数 -------> 用户登录生成Token
function UserLogin(params, callback) {
    UserInquire(params[0], (res) => {
        if (res.length <= 0) {
            callback({
                code: 518
            })
            return
        }
        if (params[1] === res[0].password) {
            jwt.sign({ username: params[0] }, tokenKey, { expiresIn: '4h' }, (err, data) => {
                if (err) {
                    callback({
                        code: 414
                    })
                    return
                }
                callback({ code: 204, token: data })

            })
            // callback({ code: 204 })
        } else {
            callback({ code: 518, token: undefined })
        }
    })
}
function UserInfo(params, callback) {
    UserInquire(params, (res) => {
        if (res.length <= 0) {
            callback({
                code: 599
            })
            return
        }
        let sql = `select * from user where username='${params[0]}' and password='${res[0].password}';`
        processing([], sql, (res) => {
            if (res.length <= 0) {
                callback({ code: 414, data: res })
                return
            }
            callback({ code: 204, data: res[0] })
        })
    })
}
function updateprofile(params, callback) {
    let sql = `update user set ${params.NewMaterialkey}=? where username=?;`
    processing(params.NewMaterialvalue, sql, (res) => {
        callback(res)
    })
}
const UserSQL = {
    UserInquire,
    UserLogin,
    UserAddUser,
    UserInfo,
    updateprofile,
    processing
}

module.exports = UserSQL