const { emailserver } = require('../config/config.js');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(emailserver.emailserve)


module.exports = function (params, callback) {
    return new Promise((reslove, reject) => {
        transporter.sendMail(params, (error, info) => {
            if (error) {
                console.log(error)
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


