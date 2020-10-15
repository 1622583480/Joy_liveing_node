const { processing } = require('./UserSql')
function user_spike(params) {
    return new Promise((reslove, reject) => {
        let sql = `select * from home_life where type=?;`
        processing([params.type], sql, data => {
            data.forEach((item, index) => {
                item.img_list = item.img_list.replace(/\"/g, "");
                item.img_list = item.img_list.replace(/\'/g, "");
                item.img_list = item.img_list.replace(/\[/g, "");
                item.img_list = item.img_list.replace(/\]/g, "");
                item.img_list = item.img_list.split(',')
            });
            reslove({ code: 204, data })
        })
    })
}

function system_spike(params) {
    return new Promise((reslove, reject) => {
        let sql = `update home_life set spike_price=?,createtime=?,lostertime=?,type=? where id=?`
        processing([params.spike_price, params.createtime, params.lostertime, params.type, params.id], sql, adta => {
            reslove({ code: 204, data })
        })
    })
}
module.exports = {
     user_spike,
    system_spike
}