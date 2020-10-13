const { processing } = require('./UserSql')

function GET_TYPE_ONE(params) {
    return new Promise((reslove, reject) => {
        const sql = `select * from home_life where type_one=?;`
        processing([params.type_one], sql, (data) => {
            if (data.length <= 0) {
                reject({ code: 104 })
            }
            console.log(data)
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

function add_product(params) {
    return new Promise((reslove, reject) => {
        let sql = `insert into home_life (title,price,img_list,introduce,parameter,type_one,type_two) values (?,?,?,?,?,?,?)`
        processing(params, sql, (data) => {
            reslove({ code: 204 })
        })
    })
}

function resvise_product(params) {
    return new Promise((reslove, reject) => {

    })
}
function rearrangement() {
    let sql = `alter table home_life drop id;`
    let sql_two = `alter table home_life add id int(11) primary key auto_increment first;`
    processing([], sql, data => {
        processing([], sql_two, data => {

        })
    })
}
// alter  table  home_life drop id; 
// alter table home_life add 'id' mediumint(6) primary key not null auto_increment first;
module.exports = {
    GET_TYPE_ONE,
    PRODUCT_ID,
    DELECT_PRODUCT,
    PRODUCT,
    PRODUCT_PAGE,
    add_product,
    resvise_product
}