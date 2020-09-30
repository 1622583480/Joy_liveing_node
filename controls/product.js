const { processing } = require('./UserSql')
const fs = require('fs')

function GET_TYPE_ONE(params) {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life where type_one=?;`
        processing([params.type_one], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 104 })
            }
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
function PRODUCT_ID(params) {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life where id=?;`;
        processing([params.id], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 416 })
            }
            data.forEach((item, index) => {
                item.img_list = item.img_list.replace(/\"/g, "");
                item.img_list = item.img_list.replace(/\'/g, "");
                item.img_list = item.img_list.replace(/\[/g, "");
                item.img_list = item.img_list.replace(/\]/g, "");
            });
            // item.img_list = item.img_list.split(',')
            reslove({ code: 204, data })
        })
    })
}



function PRODUCT_PAGE(params) {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life where id>? and id<=?;`;
        processing([(params.page - 1) * 10, params.page * 10], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 416 })
            }
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


function DELECT_PRODUCT(params) {
    return new Promise((reslove, reject) => {
        const sql = `delete from home_life where id=?;`
        processing([params.index], sql, (data) => {
            rearrangement()
            reslove({ code: 204 })
        })
    })
}

function PRODUCT() {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life;`;
        processing([], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 104 })
            }
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

function rearrangement() {
    // 重新排序函数
    const sql = `alter table home_life drop id;`
    const sql_two = `alter table home_life add 'id' mediumint(6) primary key not null auto_increment first;`
    processing([], sql, () => {
        processing([], sql_two, () => { })
    })
}
// alter  table  home_life drop id; 
// alter table home_life add 'id' mediumint(6) primary key not null auto_increment first;
module.exports = {
    GET_TYPE_ONE,
    PRODUCT_ID,
    DELECT_PRODUCT,
    PRODUCT,
    PRODUCT_PAGE
}