const { select_indent_userid, select_indent_detailid, select_indent } = require('../../../../controls/system/select')
module.exports =async function (req, res) {
    const { username, datailid } = req.fields
    if (typeof username == "undefined" && typeof datailid == "undefined") {
        res.json({
            code: 301
        })
        return
    }
    if (typeof username == "undefined" && typeof datailid !== "undefined") {
        try {
            let result = await select_indent_detailid({ datailid })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
    if (typeof username !== "undefined" && typeof datailid == "undefined") {
        try {
            let result = await select_indent_userid({ username })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return

    }
    if (typeof username !== "undefined" && typeof datailid !== "undefined") {
        try {
            let result = await select_indent({ username, datailid })
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return
    }
}