function IOserver(params) {
    return function (req, res, next) {
        // console.log(req.url)
        if(req.url == '/api/service'){
            req.IO = params
        }
        next()
    }
}
module.exports = IOserver;         