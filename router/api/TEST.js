const { processing } = require("../../controls/UserSql")
const { Get_Coupon } = require("../../controls/coupon")
module.exports = async function (req, res) {
    // try {
    //     Get_
    //     let result = await Get_Coupon(req.fields)
    //     res.json(result)
    // } catch (error) {
    //     res.json(error)
    // }
    function select_product(params) {
        return new Promise((reslove, reject) => {
            let sql = `select * from home_life where title like ? or ? or ?`
            processing([`${'%' + params.keyword + '%'}`, `${'%'+ params.keyword}`, `${params.keyword +"%"}`], sql, data => {
                reslove({ code: 204, data })
            })
        })
    }
    select_product({ keyword: "斯" }).then(result => {
        res.json(result)
    })
}
