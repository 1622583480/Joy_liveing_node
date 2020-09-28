const { processing } = require('./UserSql');
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
        let sql = `insert into indent (detailid,orderstatus,goodsid,num,create_time,user_id,parameter_id,postscript,address,coupon) values (?,?,?,?,?,?,?,?,?,?)`
        processing(params, sql, (data) => {
            reslove(user_indent({ username: params[5], detailid: params[0] }))
        })
    })
}
function user_indent(params) {
    return new Promise((reslove, rejetc) => {
        let sql = `select indent from user where username=?;`
        processing([params.username], sql, (data) => {
            if (data === null) {
                let newarr = [];
                newarr.push(params.detailid)
                let sql = `update user set indent=? where username=?`
                processing([newarr, params.username], sql, () => { reslove(204) })
                return
            }
            data.push(params.detailid)
            processing([data, params.username], sql, () => { reslove(204) })
            return
        })
    })
}
function indent_order(params) {
    return new Promise((reslove, reject) => {
        let sql = `update indent set orderstatus=? where userid=? and detailid=?`
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
module.exports = {
    randomNumber,
    initialize_indent,
    indent_order,
    confirm_receipt,
    all_indent
}