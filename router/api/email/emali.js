const { emalisend } = require('../../../controls/emali')
const { emailserver } = require('../../../config/config');
module.exports = function (req, res) {
    const { email, type } = req.fields
    if (!email || !type) {
        res.json({
            code: 301
        })
        return
    }
    let subject = '';
    let _code = emailserver.verification_code(email, type)
//    [ {
//         type:register,
//         email:1622583480@qq.com,
//         随机数：134653，
//         过期时间： 1234141234123123
//     }]
    switch (type) {
        case 'register':
            subject = "【乐居生活】验证码信息"
            break;
        case "upemali":
            subject = "【乐居生活】更新邮箱验证信息"
            break;
        case "uppass":
            subject = "【乐居生活】更新密码验证信息"
            break;
        case "forgetpass":
            subject = "【乐居生活】找回密码验证信息"
            break;
        default:
            res.json({
                code: 302
            })
            return;
    }
    let defaultOpions = {
        from: "1622583480@qq.com",
        to: email,
        subject,
        text: `这是您在乐居生活官网正在进行的验证消息，如果这个验证码不是您发起的，请无视这条消息，---验证码：${_code.verification}，十分钟之内有效。
        请勿回复此信息`
    }

    emalisend(defaultOpions).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}