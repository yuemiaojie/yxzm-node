const Router = require('koa-router')
const svgCaptcha = require('svg-captcha')

const router = new Router({
    prefix: '/api'
})

const getCaptchaApi = async ctx => {
    const config = global.config.svgCaptcha
    const captcha = svgCaptcha.create(config);

    // 向客户端发送sessionId（timestamp + clientIp）
    ctx.session.sessionId = new Date().getTime() + ctx.request.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]

    // 存储到redis { sessionId: code }
    await global.client.SET(ctx.session.sessionId, captcha.text)
    // 验证码过期时间为5分钟
    global.client.expire(ctx.session.sessionId, 60 * 5)

    throw new global.err({
        code: 200,
        data: {
            svg: captcha.data
        },
        msg: 'ok!'
    })
}

router.get('/getCaptcha', getCaptchaApi)

module.exports = router