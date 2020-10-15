const { processing } = require("./UserSql")

function Submit(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into word_order (username,content,lostertime) values (?,?,?)`
        processing([params.username,JSON.stringify(params.content),new Date().getTime()], sql, data => {
            reslove({ code: 204 ,data})
        })
    })
}
module.exports = {
    Submit
}
