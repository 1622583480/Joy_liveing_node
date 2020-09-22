const mysql = require('mysql')
const { mysqlConfig } = require('./config'); // 单独拿出sql 配置项
const pool = mysql.createPool(mysqlConfig); // 使用sql配置项

const db = {}
db.query = function (sql, params) {
    return new Promise((reslove, reject) => {
        pool.getConnection((err, Connection) => { //连接数据库
            if (err) {
                reject({
                    code: 102,
                })
                return
            }
            Connection.query(sql, params, (err, data) => {// 发起数据库语句请求 
                if (err) {
                    reject({
                        code: 104,
                    })
                    return
                }
                reslove(data)
            })
        })
    })
}
module.exports = db