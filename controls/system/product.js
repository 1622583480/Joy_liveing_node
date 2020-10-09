const { processing } = require('../UserSql')
function system_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from gome_life where (id=? or title=?) and type_one=?;`
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
module.exports = {
    system_product
}