const { emailserver } = require('../config/config.js');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(emailserver.emailserve)

const { UserInquire, processing } = require('./UserSql')


function emalisend(params) {
    return new Promise((reslove, reject) => {

        transporter.sendMail(params, (error, info) => {
            if (error) {
                reject({
                    code: 414,
                })
                return
            }
            reslove({
                code: 204,
                // info
            })
        })

    })
}

function upemail(params) {
    return new Promise((reslove, reject) => {
        UserInquire(params.username, (res) => {
            if (res.length <= 0) {
                reject({
                    code: 517
                })
                return
            }
            let sql = `update user set email=? where username=? and password=?;`
            processing([params.email, params.username, res[0].password], sql, (data) => {
                reslove({ code: 204 })
            })
        })
    })
}
function SMS(params) {
    return new Promise((reslove, reject) => {
        const sql = `select uuid from user where email=?;`
        processing([params.email], sql, (data) => {
            if (data.length <= 0) {
                reject({
                    code: 204,
                    data: {
                        uuid: null
                    }
                })
                return
            }
            reslove({
                code: 204,
                data: data[0]
            })
        })
    })
}
module.exports = {
    emalisend,
    upemail,
    SMS
}

