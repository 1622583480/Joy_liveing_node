const { processing } = require("./UserSql")

function select_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from home_life where title like ? or ? or ?`
        processing([`${'%' + params.keyword + '%'}`, `${'%'+ params.keyword}`, `${params.keyword +"%"}`], sql, data => {
            reslove({ code: 204, data })
        })
    })
}

module.exports = {
    select_product
}