const Koa = require('koa')
const catchError = require('./catch-error')
const { koaBody } = require('koa-body')
const InitManager = require('./core/init')
require('colors')

const app = new Koa()

function start() {
    // 监听全局错误事件
    app.use(catchError)

    app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
        }
    }))

    // 初始化配置
    InitManager.initCore(app)
    const { ip, port } = global.config.server
    app.listen(port)
    console.log(`Server listening on http://${ip}:${port}`.yellow)
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`.blue)
}
start()