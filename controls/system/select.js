const { processing } = require('../UserSql')
function select_user_username(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from user where username=?`;
        processing([params.username], sql, data => {
            relove({ code: 204, data })
        })
    })

}
function select_user_email(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from user where email=?`;
        processing([params.email], sql, data => {
            relove({ code: 204, data })
        })
    })

}
function select_user(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from user where username=? and email=?`;
        processing([params.username, params.email], sql, data => {
            relove({ code: 204, data })
        })
    })

}



function select_indent_userid(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from indent where user_id=?`;
        processing([params.username], sql, data => {
            relove({ code: 204, data })
        })
    })

}
function select_indent_detailid(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from indent where detailid=?`;
        processing([params.detailid], sql, data => {
            relove({ code: 204, data })
        })
    })

}
function select_indent(params) {
    return new Promise((relove, reject) => {
        let sql = `select * from indent where user_id=? and detailid=?`;
        processing([params.username, params.detailid], sql, data => {
            relove({ code: 204, data })
        })
    })

}
module.exports = {
    select_user_email,
    select_user_username,
    select_user,
    select_indent_userid,
    select_indent_detailid,
    select_indent,
}