const { processing } = require('../UserSql')



function all_coupon() {
    return new Promise((reslove, reject) => {
        let sql = `select * from coupon`
        processing([], sql, (data) => {
            console.log(data)
            reslove(data)
        })
    })
}
function add_coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into coupon (title,createtime,timer,price,integral,remark) values (?,?,?,?,?,?)`;
        processing(params, sql, data => {
            reslove({ code: 204 })
        })
    })
}
function detele_coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `delete from coupon where detailid=?;`
        processing([params.ddetailid], sql, data => {
            reslove({ code: 204 })
        })
    })
}
module.exports = { all_coupon, add_coupon, detele_coupon }