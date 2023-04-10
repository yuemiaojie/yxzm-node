const Router = require('koa-router')
const BlogList = require('../model/blogList')
const auth = require('../middleware/auth')
const {
    ValidationUpdBlogList,
    ValidationGetBlogListDetail,
    ValidationDelBlogList
} = require('../validation/blogList')

const router = new Router({
    prefix: '/api'
})

// 获取博客列表
const getBlogListApi = async () => {
    await BlogList.getBlogList()
}
// 新增/编辑博客列表
const updBlogListApi = async ctx => {
    const v = await new ValidationUpdBlogList().validate(ctx)
    const { id } = v.data.body
    if (id) {
        await BlogList.updBlogList(v.data.body)
    } else {
        await BlogList.addBlogList(v.data.body, ctx.auth.uid)
    }
}
// 获取博客标签详情
const getBlogListDetailApi = async ctx => {
    const v = await new ValidationGetBlogListDetail().validate(ctx)
    await BlogList.getBlogListDetail(v.data.query)
}
// 删除博客标签
const delBlogListApi = async ctx => {
    const v = await new ValidationDelBlogList().validate(ctx)
    await BlogList.delBlogList(v.data.body)
}

// 获取博客列表
router.get('/getBlogList', auth, getBlogListApi)
// 新增/编辑博客列表
router.post('/updBlogList', auth, updBlogListApi)
// 获取博客详情
router.get('/getBlogListDetail', auth, getBlogListDetailApi)
// 删除博客标签
router.post('/delBlogList', auth, delBlogListApi)

module.exports = router