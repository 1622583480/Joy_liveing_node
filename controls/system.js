const { processing } = require('./UserSql');
const jwt = require('jsonwebtoken');
const { administratorkey } = require('../config/config');

function user_page_list(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from user where id>=? and id<=?;`
        processing([(params.page - 1) * 10, params.page * 10], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 419 }); //无下一个用户
            }
            reslove({ code: 204, data })
            return
        })
    })
}

function userlist() {
    return new Promise((reslove, reject) => {
        const sql = `select * from user ;`
        processing([], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 414 })
            }
            reslove({ code: 204, data })
            return
        })
    })
} function page_product(params) {

}
// function adminlogin(params) {
//     return new Promise((reslove, reject) => {
//         const sql = `select password from administrator where username=?;`;
//         processing([params.username], sql, (data) => {
//             console.log(data)
//             if (data.length <= 0) {
//                 reject({ code: 517 })
//                 return
//             }
//             if (data[0].password === params.password) {
//                 jwt.sign({ username: params[0] }, administratorkey, { expiresIn: '10h' }, (err, data) => {
//                     if (err) {
//                         reject({
//                             code: 414
//                         })
//                         return
//                     }
//                     reslove({ code: 204, token: data })
//                 })
//             } else {
//                 reject({ code: 457 })
//             }
//         })
//     })

// }
function updateuser(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set password=? where uuid=?`
        processing([params.newpass, params.uuid], sql, () => {
            reslove({ code: 204 })
        })
    })
}
module.exports = {
    userlist,
    user_page_list,
    updateuser
}