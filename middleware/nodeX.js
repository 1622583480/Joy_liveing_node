const { state } = require('../config/NodeX')
function checkToken() {
    return function (req, res, next) {

        req.mapActions = function ([]) {
        
        }
        req.mapGetters = function ([]) {

        }
        next()
    }
}