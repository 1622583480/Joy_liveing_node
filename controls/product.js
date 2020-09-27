const { processing } = require('./UserSql')
const fs = require('fs')

function GET_TYPE_ONE(params) {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life where type_one=?;`
        processing([params.type_one], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 104 })
            }
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
            reslove({ code: 204, data })
        })
    })
}
function DELECT_PRODUCT(parmas) {
    return new Promise((reslove, reject) => {
        // const       
    })

}
function PRODUCT() {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life;`;
        processing([], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 104 })
            }
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
    PRODUCT
}