const Router = require('koa-router')
const User = require('../model/User')
const auth = require('../middleware/auth')
const {
    ValidationAddUserList,
    ValidationDisUserList,
    ValidationStaUserList
} = require('../validation/userList')

const router = new Router({
    prefix: '/api'
})

// 获取用户列表
const getUserListApi = async () => {
    await User.getUserList()
}
// 新增用户列表
const addUserListApi = async ctx => {
    const v = await new ValidationAddUserList().validate(ctx)
    await User.addUserList(v.data.body)
}
// 禁用用户列表
const disUserListApi = async ctx => {
    const v = await new ValidationDisUserList().validate(ctx)
    await User.disUserList(v.data.body)
}
// 启用用户列表
const staUserListApi = async ctx => {
    const v = await new ValidationStaUserList().validate(ctx)
    await User.staUserList(v.data.body)
}



// 获取用户列表
router.get('/getUserList', auth, getUserListApi)
// 新增用户列表
router.post('/addUserList', auth, addUserListApi)
// 禁用用户列表
router.post('/disUserList', auth, disUserListApi)
// 启用用户列表
router.post('/staUserList', auth, staUserListApi)

module.exports = router