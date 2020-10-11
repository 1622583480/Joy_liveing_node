const { processing } = require('./UserSql')
function add_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            let flag = true
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == params.id && data[i].parameter_index == params.parameter_index && data[i].title == params.title && data[i].price == params.price) {
                    data[i].num = data[i].num + params.num
                    flag = false
                } else {
                    flag = true
                }
            }
            if (flag) {
                data.push({ id: params.id, num: params.num, parameter: params.parameter, parameter_index: params.parameter_index, title: params.title, price: params.price });
                data[data.length - 1].delete_id = data.length
                console.log(data, '添加完毕删除id')
            }
            update_shocar({ data, username: params.username }).then(res => {
                reslove(res)
            })
        })
    })
}
function delete_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].delete_id == params.delete_id) {
                    data.splice(i, 1)
                    update_shocar({ data, username: params.username }).then(res => {
                        reslove(res)
                    })
                    return
                }
            }
            reject({ code: 578 })

        })
    })
}
function amend_shopcar(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            data[params.index].num = params.num
            data[params.index].parameter_index = params.parameter_index
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
            if (data[0].shopcar == '' || data[0].shopcar === null) {
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

function shopcar_index(params) {
    return new Promise((reslove, reject) => {
        all_shopcar({ username: params.username }).then(({ data }) => {
            reslove({ code: 204, data: data[params.index].parameter_index })
        })
    })

}
module.exports = {
    all_shopcar,
    amend_shopcar,
    delete_shopcar,
    add_shopcar,
    shopcar_index
}
