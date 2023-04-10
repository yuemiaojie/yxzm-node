const Router = require('koa-router')
const User = require('../model/user')
const auth = require('../middleware/auth')

const router = new Router({
    prefix: '/api'
})

const loginOutApi = async ctx => {
    await User.loginOut(ctx)
}

router.post('/loginOut', auth, loginOutApi)

module.exports = router