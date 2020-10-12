const { uppass, forgetpass } = require('../../../controls/passsql')
module.exports = function (req, res) {
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
    if (req.tokenstate.tokenCode == 417) {
        const { newpass, password } = req.fields
        if(typeof req.tokenstate.content.username =='undefined'){
            res.json({code:301})
            return
        }
        uppass({ username: req.tokenstate.content.username, password, newpass }).then((result) => {
            res.json(result)
            return
        }).catch((err) => {
            res.json(err)
            return
        })
    }
    if (typeof req.tokenstate.tokenCode == "undefined") {
        const { newpass, uuid, email } = req.fields;
        forgetpass({ newpass, uuid, email }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    }
}

