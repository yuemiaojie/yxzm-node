const Router = require('koa-router')
let OSS = require('ali-oss');

const router = new Router({
    prefix: '/api'
})

const uploadFileApi = async ctx => {
    let client = new OSS(global.config.OSSConfig);

    const originalFilename = ctx.request.files.file.originalFilename
    const filename = `${Date.now()}@${originalFilename}`
    const catalog = `/yxz-m/${filename}`
    const { res, url } = await client.put(catalog, ctx.request.files.file.filepath);

    if (res.status === 200) {
        throw new global.err({
            code: 200,
            data: {
                fileName: originalFilename,
                url
            },
            msg: 'ok!'
        })
    }
}

router.post('/uploadFile', uploadFileApi)

module.exports = router