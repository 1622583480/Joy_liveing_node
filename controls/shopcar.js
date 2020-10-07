const { processing } = require('./UserSql')
function add_shopcar(params) {
    return new Promise((reslove, reject) => {
        console.log(params)
        all_shopcar({ username: params.username }).then(({ data }) => {
            data.push({ id: params.id, num: params.num, parameter: params.parameter });
            update_shocar({ data, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function delete_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            console.log(data)
            let arr = data.splice(params.index, 1)
            console.log(arr)
            console.log(data)
            update_shocar({ data, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function amend_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            data[params.index].num = params.num
            data[params.index].parameter = params.parameter
            update_shocar({ data, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function all_shopcar(params) {
    return new Promise((reslove, reject) => {
        let sql = `select shopcar from user where username=?;`
        processing([params.username], sql, (data) => {
            if (data[0].shopcar == '') {
                reslove({ code: 204, data: [] })
            }
            reslove({ code: 204, data: JSON.parse(data[0].shopcar) })
        })
    })
}
function update_shocar(params) {
    return new Promise((reslove, reject) => {
        let sql = `update user set shopcar=? where username=?`;
        processing([JSON.stringify(params.data), params.username], sql, data => reslove({ code: 204 }))
    })
}

module.exports = {
    all_shopcar,
    amend_shopcar,
    delete_shopcar,
    add_shopcar
}
