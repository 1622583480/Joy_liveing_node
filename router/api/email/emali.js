
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport()
module.exports = function (req, res) {
    const { email } = req.email
    if (!email) {
        res.json({
            code: 301
        })
        return
    }
    transporter.sendMail({}, () => {

    })
}