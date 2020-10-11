// 固有模块
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');


// const https = require('https')
// const fs = require('fs')

// 自定义配置文件或中间件
const checkToken = require('./middleware/checkToken')
const { port, upload } = require('./config/config')
const routes = require('./router')

// 第三方中间件或配置
const cors = require('cors')
const Expformidable = require('express-formidable')


// const credentials = {
//     pfx:  fs.readFileSync(path.join(__dirname, './keys/www.sngblog.cn.pfx')),
//     passphrase: "43u4h06mat2",
// }

// 中间件或配置文件统一配置 
app.use('/', express.static(path.join(__dirname, './public/upload')))
app.use('/img', express.static(path.join(__dirname, './public/upload/img')))
app.use(Expformidable(upload));
app.use(cors())
app.use(checkToken())
app.use('/api', routes)

// const httpsServer = https.createServer(credentials, app)
// 页面配置 
app.use(router)
app.listen(port)
// httpsServer.listen(port);
// application/x-www-form-urlencoded