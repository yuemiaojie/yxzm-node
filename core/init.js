const Router = require('koa-router')
const requireDirectory = require('require-directory')
const HttpException = require('./../http-exception')
const cors = require('koa2-cors')

class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app
        InitManager.initEnv()
        InitManager.initSession()
        InitManager.loadConfig()
        InitManager.initRedis()
        InitManager.loadAllowOrigins()
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
    }

    static initEnv() {
        const env = process.env.npm_lifecycle_event
        global.env = env
    }

    // 全局变量
    static loadConfig() {
        const configPath = process.cwd() + '/config'
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        // path config
        const apiDirectory = `${process.cwd()}/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException() {
        global.err = HttpException
    }

    static loadAllowOrigins() {
        // 定义允许跨域的origin
        const allowOrigins = global.config.allowOrigins
        InitManager.app.use(
            cors({
                origin: function (ctx) {
                    return ctx.header.origin
                    if (allowOrigins.includes(ctx.header.origin)) {
                        return ctx.header.origin
                    }
                    return false
                },
                exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
                maxAge: 5,
                credentials: true,
                withCredentials: true,
                allowMethods: ['GET', 'POST', 'DELETE'],
                allowHeaders: ['Content-Type', 'Authorization', 'Accept']
            })
        )
    }

    static async initRedis() {
        const redis = require('redis');

        const client = redis.createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));

        await client.connect();

        global.client = client
        global.redis = redis
    }

    static initSession() {
        const session = require("koa-session");

        const session_signed_key = ["appletSystem"];
        // session配置
        const CONFIG = {
        };
        InitManager.app.keys = session_signed_key;
        InitManager.app.use(session(CONFIG, InitManager.app));
    }
}

module.exports = InitManager