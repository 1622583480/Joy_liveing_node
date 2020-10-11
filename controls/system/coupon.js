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
        let sql = `insert into coupon (title,createtime,timer,price,integral,remark,_id) values (?,?,?,?,?,?,?)`;
        processing(params, sql, data => {
            reslove({ code: 204 })
        })
    })
}
function delete_coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `delete from coupon where _id=?;`
        processing([params._id], sql, data => {
            reslove({ code: 204 })
        })
    })
}
module.exports = { all_coupon, add_coupon, delete_coupon }