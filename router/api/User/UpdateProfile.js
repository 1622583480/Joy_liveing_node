const { updateprofile } = require('../../../controls/UserSql');
module.exports = async function (req, res) {
    if (req.tokenstate.tokenCode == 401) {
        res.json({
            code: 401
        })
        return
    }
    if (req.tokenstate.tokenCode == 402) {
        res.json({
            code: 402
        })
        return
    }
    if (typeof req.tokenstate.tokenCode == 'undefined') {
        res.json({
            code: 301
        })
        return
    }

    const newuserINfo = req.fields
    if (!newuserINfo) {
        res.json({
            code: 301
        })
        return;
    }
    for (let i in newuserINfo) {
        if (i == 'id' || i == 'username' || i == 'password' || i == 'email' || i == 'userdate' || i == "shippingaddress" || i == 'uuid' || i == 'integral' || i == 'shopcar' || i == "coupon" || i == "collect") {
            res.json({ code: 414 })
            return
        }
    }
    for (let i in newuserINfo) {
        try {
            let result = await updateprofile({ key: i, value: newuserINfo[i], username: req.tokenstate.content.username })
            if (result !== 204) {
                res.json({code:104})
            }
        } catch (error) {
            res.json(error)
        }
    }
    res.json({ code: 204 })
}