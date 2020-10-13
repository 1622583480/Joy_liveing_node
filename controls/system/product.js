const { processing } = require('../UserSql')
function system_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from home_life where id=? and title=? and type_one=?;`
        processing(params, sql, data => {
            data.forEach((item, index) => {
                item.img_list = item.img_list.replace(/\"/g, "");
                item.img_list = item.img_list.replace(/\'/g, "");
                item.img_list = item.img_list.replace(/\[/g, "");
                item.img_list = item.img_list.replace(/\]/g, "");
            });
            reslove({ code: 204, data })
        })
    })
}
function edit_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `update home_life set ${params.key}=? where id=?`
        processing([parasm.value, params.id], sql, data => {
            reslove({ code: 204 })
        })
    })

}
module.exports = {
    system_product,
    edit_product
}