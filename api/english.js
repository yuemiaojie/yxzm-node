const Router = require('koa-router')
const English = require('../model/english')
const { ValidationGetEnglish, ValidationEditEnglish } = require('../validation/english')
const auth = require('../middleware/auth')

const router = new Router({
    prefix: '/api'
})

const getEnglishApi = async (ctx) => {
    const v = await new ValidationGetEnglish().validate(ctx)
    await English.getEnglish(v.data.query)
}

const editEnglishApi = async (ctx) => {
    const v = await new ValidationEditEnglish().validate(ctx)
    await English.editEnglist(v.data.body)
}

router.get('/getEnglish', auth, getEnglishApi)

router.post('/editEnglish', auth, editEnglishApi)


module.exports = router