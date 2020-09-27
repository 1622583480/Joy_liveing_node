const { GET_TYPE_ONE } = require('../../../controls/product')

module.exports = function (req, res) {
    const { type_one } = req.query
    const type_onelist = ['沙发', '床', '橱柜', '储物柜', '布艺', '浴室', '灯具', '桌椅']
    type_onelist.forEach(async (item, index) => {
        if (type_one == item) {
            try {
                let result = await GET_TYPE_ONE({ type_one })
                res.json(result)
                return
            } catch (error) {
                res.json(error)
                return
            }
        }
    })
}