const { processing } = require('./UserSql');
const { pay, refund_indents_clend } = require('./pay')
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
    return orderCode;
}

async function initialize_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into indent (detailid,orderstatus,goodsid,num,create_time,user_id,parameter,postscript,address,coupon,indent_collection,all_price) values (?,?,?,?,?,?,?,?,?,?,?,?);`
        processing(params, sql, data => {
            console.log(data)
            reslove({ code: 204, data, message: "可能是错误" })
        })
    })
}
function update_user_coupon(params) {
    return new Promise(async (reslove, reject) => {
        // params[params.length - 2] 获取的是优惠券对象   这里进行的是扣除优惠券处理

        if (params.coupon && !(params.coupon == 'null')) {
            // 由于优惠券对象已经转json 所以这里转回来
            try {

                let result = await Delete_coupon({ username: params.username, coupon: params.coupon })
                if (result == 204) {
                    reslove({ code: 204 })
                } else {
                    reject(result)
                }
            } catch (error) {
                console.log(error, "用户创建订单删除用户优惠券失败的异常捕获")
            }
        }
        reslove({ code: 204 })
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
                if (params.coupon._id == couponobj[i]._id && params.coupon.createtimer == couponobj[i].createtimer) {
                    if (params.losetimer < new Date().getTime()) {
                        reject({ code: 414, message: "该用户的优惠券已过期" })
                        break;
                    }
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
            } else {
                reject({ code: 516 })
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
            pay_obj.price = parseInt(data[0].price) * parseInt(params.num)
            reslove(pay_obj)
        })
    })
}
function indent_order(params) {
    return new Promise(async (reslove, reject) => {
        let pay_obj = { body: '', price: 0 }
        try {
            let result = await create_payment({ username: params.username, pay_obj, indent_collection: params.indent_collection })
            if (result.coupon) {
                result.price = result.price - result.coupon.price
            }
            let integral = await all_integral({ username: params.username, pay_obj })
            let pay_integral = parseInt(result.price) / 100 + parseInt(integral.data.integral)
            add_integral({ username: params.username, pay_integral })
            let payment_res = await call_pay({ username: params.username, pay_obj })
            reslove(payment_res)
        } catch (error) {
            reject(error)
        }

    })
}
function call_pay(params) { // 走支付模块 
    return new Promise(async (reslove, reject) => {
        console.log(params.pay_obj, '拿到的新的支付对象')
        let zfbURL = await pay(params.pay_obj)
        reslove({ code: 204, data: zfbURL })
    })
}
function create_payment(params) {
    return new Promise(async (reslove, reject) => {
        console.log(params)
        let tally_order_code = randomNumber()
        for (let j in params.indent_collection) {
            try {
                let data = await user_indent({ username: params.username, indent_collection: params.indent_collection[j] })
                // data 拿到的是创建的订单 

                for (let i = 0; i < data.length; i++) {
                    try {
                        let result = await indent_product({ id: data[i].goodsid, num: data[i].num })
                        params.pay_obj.body += result.body
                        params.pay_obj.price += result.price
                    } catch (error) {
                        reject({ code: 414, error })
                    }
                }
                // 拿到 所有的订单 直接生成新的订单集合号 用于批量 控制二级订单集合号码
                tally_order({ tally_order_code, username: params.username, indent_collection: params.indent_collection[j] })
                params.pay_obj.tally_order = tally_order_code
                if (!(JSON.parse(data[0].coupon) === null)) {
                    params.pay_obj.coupon = JSON.parse(data[0].coupon)
                }
                reslove(params.pay_obj)
            } catch (error) {
                reject(error)
            }
        }
    })
}
function add_integral(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set integral=? where username=?;`
        processing([params.pay_integral, params.username], sql, data => { })
    })
}
function all_integral(params) {
    return new Promise((reslove, reject) => {
        let sql = `select integral from user where username=?;`
        processing([params.username], sql, data => {
            reslove({ code: 204, data: data[0] })
        })
    })
}
function tally_order(params) {
    return new Promise((reslove, reject) => {
        let sql = `update indent set tally_order=? where user_id=? and indent_collection=?;`
        processing([params.tally_order_code, params.username, params.indent_collection], sql, data => {

        })
    })
}

function confirm_receipt(params) {
    return new Pormise((reslove, reject) => {
        let sql = `update indent set orderstatus=? where user_id=? and detailid=?`
        processing(params, sql, (data) => {
            reslove(204)
        })
    })
}

function delete_indent_notpay(params) {
    return new Promise((reslove, reject) => {
        let sql = `delete from indent where detailid=? and user_id=?;`
        processing([params.detailid, params.username], sql, data => {
            reslove({ code: 204 })
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
function active_indents(params) {
    return new Pormise((reslove, reject) => {
        let sql = `update indent set orderstatus=? where user_id=? and indent_collection=?`
        processing(params, sql, (data) => {
            reslove({ code: 204 })
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
function refund_indent(params) {
    return new Promise(async (reslove, reject) => {
        try {
            let money = await pay_indent({ username: params.username, detailid: params.detailid })
            let coupon = await refund_indents_clend({ all_price: money.all_price, username: params.username, tally_order: money.tally_order })
            // reslove(coupon)
            if (coupon == 7204) {
                let result = await delete_indent({ username: params.username, tally_order: money.tally_order })
                reslove(result)
            }
        } catch (error) {

        }
    })
}
function delete_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `update indent set orderstatus=? where user_id=? and tally_order=?`;
        processing(['已退款', params.username, params.tally_order], sql, data => {
            reslove({ code: 204 })
        })
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
function pay_indent(params) {
    return new Promise((reslove, rejetc) => {
        let sql = `select * from indent where user_id=? and detailid=?;`
        processing([params.username, params.detailid], sql, (data) => {
            reslove(data[0])
        })
    })
}
function system_edit_address(params) {
    return new Promise((reslove, reject) => {
        let sql = `update indent set address=? where indent_collection=?;`
        processing([params.address, params.indent_collection], sql, data => {
            reslove({ code: 204 })
        })
    })
}
function deliver_indent(params) {
    return new Promise((reslove, reject) => {
        let sql = `update indent set orderstatus=?,waybill=? where detailid=?;`
        processing([params.orderstatus, params.waybill, params.detailid], sql, data => {
            reslove({ code: 204 })
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
    refund_indent,
    Delete_coupon,
    update_user_coupon,
    all_integral,
    delete_indent_notpay,
    active_indents,
    system_edit_address,
    deliver_indent
}
