const { processing } = require('./UserSql')
function add_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar(params.username).then(res => {
            let newarr = res.push({ id: params.id, num: params.num, parameter: params.parameter });
                update_shocar({ newarr, username: params.username }).then(res => {
                    reslove(res)
                })
        })
    })
}
function delete_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar(params.username).then(res => {

            let newarr = res.splice(params.index, 1)
            update_shocar({ newarr, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function amend_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar(params.username).then(res => {
            res[index] = params.content
            let newarr = res
            update_shocar({ newarr, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function all_shopcar(params) {
    return new Promise((reslove, reject) => {
        let sql = `select shopcar from user where username=?; `
        processing([params.username], sql, (data) => {
            reslove({ code: 204, data })
        })
    })
}
function update_shocar(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set shopcar=? where usernmae=?`;
        processing([params.newarr, params.username], sql, data => reslove({ code: 204 }))
    })
}

module.exports = {
    all_shopcar,
    amend_shopcar,
    delete_shopcar,
    add_shopcar
}