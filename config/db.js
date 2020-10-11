const mysql = require('mysql');
const { processing } = require('../controls/UserSql');
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
                console.log(err, '检查语句')
                if (err) {
                    reject({
                        code: 104,
                    })
                    return
                }
                reslove(data)
                Connection.release()
            })
        })
    })
}
db.select = function (params) {
    return new Promise((reslove, reejct) => {
        let value = "*"
        // if (typeof params.condition == "undefined") {

        // }
        for (let i in params.value) {
            value = ""
            value += params.value[i] + ","
        }
        for (let i in params.condition) {

        }
        let sql = `select ${value} from ${params.surface} `
        processing([], sql, data => {
            if (data.length <= 0) {
                reslove([])
                return
            }
            reslove(data)
        })
    })
}
module.exports = db
