const { UserInquire, processing } = require('./UserSql')
function uppass(params) {
    return new Promise((reslove, reject) => {
        console.log()
        UserInquire(params.username, (result) => {
            console.log(result[0].password, params.password, '检查代码')
            if (result[0].password == params.password) {
                let sql = `update user set password=? where username=? and password=?;`;
                processing([params.newpass, params.username, result[0].password], sql, (data) => {
                    console.log(data)
                    reslove({ code: 204 })
                })
            } else {
                reject({ code: 448 })
            }
        })
    })
}
function forgetpass(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set password=? where uuid=? and email=?;`;
        processing([params.newpass, params.uuid, params.email], sql, (data) => {
            // console.log(data)
            reslove({ code: 204 })
        })
    })
}


module.exports = {
    uppass,
    forgetpass
}