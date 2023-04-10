const Router = require('koa-router')
const User = require('../model/user')
const { ValidationLogin } = require('../validation/login')

const router = new Router({
    prefix: '/api'
})

const loginApi = async ctx => {
    const v = await new ValidationLogin().validate(ctx)
    await User.login(v.data.body, ctx.session.sessionId)
}

router.post('/login', loginApi)

module.exports = router