const { processing } = require('./UserSql')
function exchange(params) {
    return new Promise(async (reslove, reject) => {
        try {
            let result = await Get_Coupon({
                _id: params._id
            })
            let user_Integral = await Verify_Integral({ username: params.username }); //查询当前用户的所有的积分
            if (!(parseInt(user_Integral) > parseInt(result.integral))) {
                // 做兑换处理 积分不够直接rertun
                reject({ code: 517 })
                return
            }
            Set_user_integral({ integral: parseInt(user_Integral) - parseInt(result.integral), username: params.username })
            // 如果积分够 直接更新用户积分
            // 创建params 用户的 优惠券对象
            params.couponobj.losetimer = parseInt(params.couponobj.createtimer) + parseInt(result.timer)
            params.couponobj._id = result._id
            params.couponobj.price = result.price
            params.couponobj.title = result.title

        } catch (error) {
            reslove(error)
        }
        try {
            let result = await Get_user_coupon({ username: params.username });// 获取用户所有的优惠券
            
            result.push(params.couponobj); //加入优惠券
            let Exchange_Result = await Set_User_Coupon({ couponobj: result, username: params.username })
            // 更新用户本身的优惠券对象 
            reslove(Exchange_Result)
        } catch (error) {
            reject(error)
        }
    })
}
function Get_Coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from coupon where _id=?;`
        processing([params._id], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 414 })
            }
            reslove(data[0])
        })
    })
}
function Get_user_coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `select coupon from user where username=?`
        processing([params.username], sql, data => {
            
            if (data.length <= 0 || data[0].coupon === null || data[0].coupon == '') {
                reslove([])
            }
            reslove(JSON.parse(data[0].coupon))
        })
    })
}
function Set_User_Coupon(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set coupon=? where username=?;`
        processing([JSON.stringify(params.couponobj), params.username], sql, data => {
            reslove({ code: 204 })
        })
    })
}
function Verify_Integral(params) {
    return new Promise((reslove, reject) => {
        let sql = `select integral from user where username=?;`
        processing([params.username], sql, data => {
            reslove(data[0].integral)
        })
    })
}
function Set_user_integral(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set integral=? where username=?;`
        processing([params.integral, params.username], sql, data => {
        })
    })
}
module.exports = {
    exchange,
    Get_user_coupon,
    Get_Coupon,
    Set_User_Coupon
}