const Router = require('koa-router')
const User = require('../model/user')
const auth = require('../middleware/auth')

const router = new Router({
    prefix: '/api'
})

const getUserInfoApi = async ctx => {
    // get用ctx.query post用ctx.request.body
    await User.getUserInfo(ctx)
}

router.get('/getUserInfo', auth, getUserInfoApi)

module.exports = router