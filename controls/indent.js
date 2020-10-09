const { processing } = require('./UserSql');
const { pay, slect_pay_order } = require('./pay')
function setTimeDateFmt(s) {  // 个位数补齐十位数
    return s < 10 ? '0' + s : s;
}
function randomNumber() {
    // 随机数生成订单号
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    console.log(orderCode)
    return orderCode;
}

function initialize_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into indent (detailid,orderstatus,goodsid,num,create_time,user_id,parameter,postscript,address,coupon) values (?,?,?,?,?,?,?,?,?,?)`
        processing(params, sql, (data) => {
            reslove({ code: 204 })
        })
    })
}
function user_indent(params) {
    return new Promise((reslove, rejetc) => {
        let sql = `select * from indent where user_id=?;`
        processing([params.username], sql, (data) => {
            reslove(data)
        })
    })
}
function indent_order(params) {
    return new Promise((reslove, reject) => {
        user_indent({ username: params[1] }).then(async data => {
            let a = await pay(data[0])
            reslove({code:204,data:a})
        })
        return
        let sql = `update indent set orderstatus=? where user_id=? and detailid=?`
        processing(params, sql, (data) => {
            reslove(204)
        })
    })
}
function confirm_receipt(params) {
    return new Pormise((reslove, reject) => {
        let sql = `update indent set orderstatus=? where userid=? and detailid=?`
        processing(params, sql, (data) => {
            reslove(204)
        })
    })
}
function all_indent() {
    return new Promise((reslove, reject) => {
        let sql = `select * from indent`
        processing([], sql, (data) => {
            reslove({ coe: 204, data })
        })
    })
}
function page_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from indent where id between ? and ?;`
        processing([(params.page - 1) * 10, params.page * 10], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 419 }); //无下一个用户
            }
            reslove({ code: 204, data })
            return
        })
    })
}
function id_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from indent where user_id=?`
        processing([params.username], sql, (data) => {
            reslove({ coe: 204, data })
        })
    })
}
module.exports = {
    randomNumber,
    initialize_indent,
    indent_order,
    confirm_receipt,
    all_indent,
    id_indent,
    page_indent
}
