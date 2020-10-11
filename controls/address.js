const { processing } = require('./UserSql')
function ALL_ADDRESS(params) {
    return new Promise((reslove, reject) => {
        let sql = `select shippingaddress from user where username=?;`
        processing([params.username], sql, (data) => {
            Object.keys(data[0]).forEach(item => {
                if (!data[0][item]) {
                    reslove(null)
                    return
                }
                reslove(JSON.parse(data[0][item]))
                return
            })
        })
    })
}
function DELETE_ADDRESS(params) {
    return new Promise((reslove, reject) => {
        ALL_ADDRESS({ username: params.username }).then(res => {
            if (res.length <= 0) {
                reslove(updateshipping([], params.username));
                return
            }
          res.splice(params.index, 1);
            reslove(updateshipping(res, params.username))
        })
    })
}
function ADD_ADDRESS(params) {
    return new Promise((reslove, reject) => {
        ALL_ADDRESS({ username: params.username }).then(res => {
            if (!Array.isArray(res)) {
                let arr = []
                arr.push(params.address);
                reslove(updateshipping(arr, params.username))
                return
            }
            res.push(params.address)
            reslove(updateshipping(res, params.username))
        })
    })
}
// data[params.index] = {}
function updateshipping(res, username) {
    let sql = `update user set shippingaddress=? where username=?;`;
    processing([JSON.stringify(res), username], sql, (data) => { })
    return { code: 204 }
}
function REVISE_ADDRESS(params) {
    return new Promise((reslove, reject) => {
        ALL_ADDRESS({ username: params.username }).then(res => {
            let newArr = res
            newArr[params.index] = params.address
            reslove(updateshipping(newArr, params.username))
        })
    })

}
module.exports = {
    ALL_ADDRESS,
    DELETE_ADDRESS,
    ADD_ADDRESS,
    REVISE_ADDRESS
}