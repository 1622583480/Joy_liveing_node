const { json } = require('express')
const { processing } = require('./UserSql')
function add_collect(params) {
    return new Promise((reslove, reject) => {
        all_collect({ username: params.username }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i] == params.product_id) {
                    reslove({ code: 204 })
                    return
                }
            }
            data.push(params.product_id)

            let sql = `update user set collect=? where username=?`;
            processing([[JSON.stringify(data)], params.username], sql, data => {
                reslove({ code: 204 })
            })
        })
    })
}
function delete_collect(params) {
    return new Promise((reslove, reject) => {
        all_collect({ username: params.username }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i] == params.product_id) {
                    let a = data.splice(i, 1)
                    console.log(a)
                }
            }
            let sql = `update user set collect=? where username=?`;
            processing([[JSON.stringify(data)], params.username], sql, data => {
                reslove({ code: 204 })
            })
        })
    })
}


function all_collect(params) {
    return new Promise((reslove, reject) => {
        let sql = `select collect from user where username=?;`
        processing([params.username], sql, data => {
            if (data[0].collect === null || data[0].collect == '') {
                reslove({ code: 204, data: [] })
                return
            }
            reslove({ code: 204, data: JSON.parse(data[0].collect) })
        })
    })
}
module.exports = {
    add_collect,
    delete_collect,
    all_collect
}