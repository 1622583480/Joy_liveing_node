const { rejects } = require('assert')
const path = require('path')
let config = {
    port: 7147,
    host: 'localhost',
    base: 'http://localhost:3000',
    mysqlConfig: {
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'supermarket',
        multipleStatements: true
    },
    upload: {
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, '../public/upload'),
        keepExtensions: true,
        multiples: true,
    },
    upfile: {
    },
    emailserver: {
        emailserve: {
            service: "qq",
            port: 465, // 端口
            secure: true,
            secureConnection: true, // use SSL
            auth: {
                "user": '1622583480@qq.com', // 邮箱账号
                "pass": 'nwoflakcjiztcjid' // 邮箱的授权码
            }
        },
        verification_code(email, type) {
            let code = {
                type,
                email,
                time: new Date().getTime() + 1000 * 60 * 10,
                verification: Math.random().toFixed(6).slice(-6),
            }
            this.email_user.forEach((item, index) => {
                if (item.email == email && item.type == type) {
                    this.email_user[index] = code
                    return code;
                }
            })
            this.email_user.push(code)
            return code
        },
        Verification_code_analysis(codeObj) {
            return new Promise((reslove, rejects) => {
                this.email_user.forEach((item, index) => {
                    if (item.email == codeObj.email && codeObj.type == item.type) {
                        if (new Date().getTime() > item.time) {
                            rejects({ code: 591 })
                            return
                        }
                        if (!(item.verification == codeObj.code)) {
                            rejects({ code: 505 })
                            return
                        }
                        reslove({ code: 204 })
                    }
                })
            })
        },
        email_user: [],
        Verification_code_delete(email, code, type) {
            this.email_user.forEach((item, index) => {
                if (item.email == email && item.type == type && item.verification == code) {
                    this.email_user.splice(index, 1)
                }
            })
        },
        email_text: [

        ]
    },
    tokenKey: 'Joy_living_Do_not_modify_the_encryption_rules'
}
module.exports = config;
