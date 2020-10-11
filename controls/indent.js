const { processing } = require('./UserSql');
const { pay, select_pay_order } = require('./pay')
const { Get_user_coupon, Set_User_Coupon } = require('./coupon')

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

async function initialize_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into indent (detailid,orderstatus,goodsid,num,create_time,user_id,parameter,postscript,address,coupon,indent_collection) values (?,?,?,?,?,?,?,?,?,?,?);`
        processing(params, sql, async (data) => {
            // params[params.length - 2] 获取的是优惠券对象   这里进行的是扣除优惠券处理
            if (params[params.length - 2]) {
                // 由于优惠券对象已经转json 所以这里转回来
                let coupon = JSON.parse(params[params.length - 2])
                try {
                    let result = await Delete_coupon({ username: params.username, coupon })
                    if (result == 204) {
                        reslove({ code: 204 })
                    }
                } catch (error) {
                    console.log(error, "用户创建订单删除用户优惠券失败的异常捕获")
                }
            }
            reslove({ code: 204 })
        })
    })
}
function Delete_coupon(params) {
    return new Promise(async (reslove, reject) => {
        let Deduction = null; // 接收一个优惠券返回值 用于判断
        try {
            let couponobj = await Get_user_coupon({ username: params.username })
            // 返回用户所有的优惠券 ? ? ? 
            if (couponobj.length <= 0) {
                reject({ code: 414, message: "未搜索到该用户有优惠券,但是用户已使用优惠券,请注意该用户" })
                return
            }
            for (let i in couponobj) {
                if (params.coupon._id == couponobj._id) {
                    Deduction = couponobj.splice(i, 1)
                    break;
                }
            }
            if (Deduction) {
                let new_user_coupons = await Set_User_Coupon({ couponobj, username: params.username })
                if (!(new_user_coupons.code == 204)) {
                    reject({ code: 414, message: "更新用户的优惠券失败" })
                } else {
                    reslove({ code: 204 })
                }
            }
        } catch (error) {
            reject({ code: 414, data: error, message: "未知错误" })
        }
    })
}


function indent_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `select price,title from home_life where id=?;`
        processing([params.id], sql, data => {
            let pay_obj = {}
            pay_obj.body = data[0].title + '、'
            pay_obj.price = data[0].price * params.num
            reslove(pay_obj)
        })
    })
}
function indent_order(params) {
    return new Promise(async (reslove, reject) => {
        let pay_obj = { body: '', price: 0 }
        for (let j in params.indent_collection) {
            user_indent({ username: params.username, indent_collection: params.indent_collection[j] }).then(async data => {
                for (let i = 0; i < data.length; i++) {
                    try {
                        let result = await indent_product(data[i])
                        pay_obj.body += result.body
                        pay_obj.price += result.price
                    } catch (error) {
                        reject({ code: 414, error })
                    }
                }
            })
        }
        pay_obj.indent_collection = params.indent_collection
        let zfbURL = await pay(pay_obj)
        reslove(zfbURL)
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


// 后台管理系统的 =====> 
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
        processing([(params.page - 1) * 10 + 1, params.page * 10], sql, (data) => {
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
function cancel_indent(params) {
    return new Promise(async (reslove, reject) => {
        try {
            let coupon = await user_indent({ username: params.username, indent_collection: params.indent_collection })

        } catch (error) {

        }
    })
}
function delete_indent(params) {
    return new Promise((reslove, reject) => {

    })
}
function user_indent(params) {
    return new Promise((reslove, rejetc) => {
        let sql = `select * from indent where user_id=? and indent_collection=?;`
        processing([params.username, params.indent_collection], sql, (data) => {
            reslove(data)
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
    page_indent,
    cancel_indent
}
