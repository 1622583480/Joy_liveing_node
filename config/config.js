const path = require('path')
const config = {
    port: 7147,
    host: 'localhost',
    base: 'http://localhost:3000',
    mysqlConfig: {
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'supermarket'
    },
    upload: {
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, '../public/upload'),
        keepExtensions: true,
        multiples: true,
    },
    upfile: {
    },
    email: {
        host: "1622583480@qq.com", // 网易的邮件地址
        port: 465, // 端口
        secureConnection: false, // use SSL
        auth: {
            "user": '1622583480@qq.com', // 邮箱账号
            "pass": 'nwoflakcjiztcjid' // 邮箱的授权码
        }
    },
    tokenKey: 'Joy_living_Do_not_modify_the_encryption_rules'
}
module.exports = config