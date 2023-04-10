const Router = require('koa-router')
const auth = require('../middleware/auth')
const fs = require('fs')

const router = new Router({
    prefix: '/api'
})

const getPublicKeyApi = async ctx => {
    const publicKey = fs.readFileSync('publicKey.txt', 'utf-8');
    throw new global.err({
        code: 200,
        data: publicKey,
        msg: 'ok!'
    })
}

router.get('/getPublicKey', getPublicKeyApi)

module.exports = router