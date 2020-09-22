const jwt = require('jsonwebtoken');
const { tokenKey } = require('../config/config');

// 引入jsonwebtoken 模块 
// 引入加密密钥

function checkToken() {
    return function (req, res, next) {
        let token = req.headers.sessiontoken;
        // console.log(token)
        if (typeof token == 'undefined') {
            next()
            return
        }
        jwt.verify(token, tokenKey, (err, data) => {
            if (err) {
                req.tokenstate = {
                    tokenCode: '401',
                    tokenMsg: '无效token',
                    content: null
                }

                next()
                return
            }
            // console.log(new Date().getTime(), data.exp * 1000)
            if (new Date().getTime() > data.exp * 1000) {
                // 过期Token 处理 
                req.tokenstate = {
                    tokenCode: '402',
                    tokenMsg: 'token过期',
                    content: null
                }
                next()
                return
            }
            req.tokenstate = {
                tokenCode: '417',
                tokenMsg: 'token验证通过',
                content: data
            }
            next()
        })
    }
}
module.exports = checkToken;           