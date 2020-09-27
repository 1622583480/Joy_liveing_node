var CryptoJS = require("crypto-js");
function checkToken() {
    return function (req, res, next) {
        req.uidhashencrypt = function () {
            
        }
        req.uidhashDecrypt = function () {

        }
        next();
    }
}