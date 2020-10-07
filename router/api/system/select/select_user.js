const { select_user_email, select_user_username, select_user } = require('../../../../controls/system/select')
module.exports = async function (req, res) {
    const { username, email } = req.fields
    if (typeof username == "undefined" && typeof email == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    if (typeof username == "undefined" && typeof email !== "undefined") {
        try {
            let result = await select_user_email({ email })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    if (typeof username !== "undefined" && typeof email == "undefined") {
        try {
            let result = await select_user_username({ username })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    if (typeof username !== "undefined" && typeof email !== "undefined") {
        try {
            let result = await select_user({ username, email })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return

    }
}