// 固有模块
const express = require('express')
const app = express();
const router = express.Router();
const path = require('path')



// 自定义配置文件或中间件
const checkToken = require('./middleware/checkToken')
const { port, upload } = require('./config/config')
const routes = require('./router')

// 第三方中间件或配置
const cors = require('cors')

const Expformidable = require('express-formidable')



// 中间件或配置文件统一配置 
app.use(Expformidable(upload));
app.use(cors())
app.use(checkToken())
app.use('/', express.static(path.join(__dirname, './public/upload')))
app.use('/', routes)


// 页面配置 
app.use(router)
app.listen(port);