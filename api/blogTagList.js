const Router = require('koa-router')
const blogTagList = require('../model/blogTagList')
const auth = require('../middleware/auth')
const {
    ValidationBlogTagList,
    ValidationGetBlogTagListDetail,
    ValidationDelBlogTagList
} = require('../validation/blogTagList')

const router = new Router({
    prefix: '/api'
})

// 获取博客标签列表
const getBlogTagListApi = async ctx => {
    await blogTagList.getBlogTagList()
}
// 新增博客标签列表
const updBlogTagListApi = async ctx => {
    const v = await new ValidationBlogTagList().validate(ctx)
    const { id } = v.data.body
    if (id) {
        await blogTagList.updBlogTagList(v.data.body)
    } else {
        await blogTagList.addBlogTagList(v.data.body)
    }
}
// 获取博客标签详情
const getBlogTagListDetailApi = async ctx => {
    const v = await new ValidationGetBlogTagListDetail().validate(ctx)
    await blogTagList.getBlogTagListDetail(v.data.query)
}
// 删除博客标签
const delBlogTagListApi = async ctx => {
    const v = await new ValidationDelBlogTagList().validate(ctx)
    await blogTagList.delBlogTagList(v.data.body)
}


// 获取博客标签列表
router.get('/getBlogTagList', auth, getBlogTagListApi)
// 新增博客标签列表
router.post('/updBlogTagList', auth, updBlogTagListApi)
// 获取博客标签详情
router.get('/getBlogTagListDetail', auth, getBlogTagListDetailApi)
// 删除博客标签
router.post('/delBlogTagList', auth, delBlogTagListApi)

module.exports = router