const { all_indent } = require('../../../controls/indent')
module.exports = async function (req, res) {
    const {username} = req.query
    if(typeof username == "undefined"){
        try {
            let result = await all_indent()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
        return    
    }
    
    
}