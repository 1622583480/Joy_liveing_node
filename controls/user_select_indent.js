const { processing } = require('./UserSql')
function all_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from indent where user_id=?;`
        processing([params.username], sql, (data) => {
            console.log(data)
            reslove({ code: 204, data })
        })
    })
}
function order_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from indent where user_id=? and orderstatus=?;`
        processing([params.username, params.order], sql, data => {
            reslove({ code: 204, data })
        })
    })
}
module.exports = {
    all_indent,
    order_indent
}