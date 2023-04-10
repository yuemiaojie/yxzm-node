const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User extends Model {
    static async login(params, sessionId) {
        const { account, password, code } = params

        // Redis中查询sessionId
        if (account !== 'admin') {
            const sessionIdByRedis = await global.client.GET(sessionId)
            if (sessionIdByRedis !== code) {
                throw new global.err({
                    code: 500,
                    data: {},
                    msg: 'code码不一致!'
                })
            }
        }

        // 通过账号查询数据库
        let user = await User.findOne({
            where: {
                account
            }
        })

        // 用户不存在，提示用户
        if (!user) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '账号不存在!'
            })
        }

        // 用户输入的密码解密
        const decryptPassword = global.config.webDecrypt(password)
        // 用户输入的密码对比数据库中的hash
        const res = await bcrypt.compare(decryptPassword, user.password)
        if (!res) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '密码错误!'
            })
        }

        if (user.status === 0) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '该用户已被禁用，请联系管理员!'
            })
        }

        // token加密
        const token = global.config.encrypt(
            JSON.stringify({
                u: user.getDataValue('id'), // id
                t: new Date().getTime() // 记录当前的时间
            })
        )

        // 存储到redis
        await global.client.SADD('token', token)

        throw new global.err({
            code: 200,
            data: {
                token
            },
            msg: 'ok!'
        })
    }

    // 获取用户列表
    static async getUserList() {
        const res = await User.findAndCountAll({
            attributes: {
                exclude: ['password']
            }
        })
        if (res) {
            // 提示用户
            throw new global.err({
                code: 200,
                data: res,
                msg: 'ok!'
            })
        }
    }

    // 新增用户列表
    static async addUserList(data) {
        const { nickName, account, password } = data
        const isRepeatNickname = await User.findOne({
            where: { nickName }
        })
        if (isRepeatNickname) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '昵称已存在!'
            })
        }
        const isRepeatAccount = await User.findOne({
            where: { account }
        })
        if (isRepeatAccount) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '账号已存在!'
            })
        }

        // 用户输入的密码解密
        const decryptPassword = global.config.webDecrypt(password)
        // 用户输入的密码解密hash加密
        const hash = await bcrypt.hash(decryptPassword, saltRounds);
        await User.create({ ...data, password: hash })

        // 提示用户
        throw new global.err({
            code: 200,
            data: {},
            msg: '用户新增成功!'
        })
    }

    // 禁用用户列表
    static async disUserList(data) {
        const { id } = data
        const user = await User.findOne({
            where: { id }
        })
        if (!user) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '用户不存在!'
            })
        }
        // 更新用户状态
        user.status = 0
        await user.save()

        // 提示用户
        throw new global.err({
            code: 200,
            data: {},
            msg: '禁用成功!'
        })
    }

    // 启用用户列表
    static async staUserList(data) {
        const { id } = data
        const user = await User.findOne({
            where: { id }
        })
        if (!user) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '用户不存在!'
            })
        }
        // 更新用户状态
        user.status = 1
        await user.save()

        // 提示用户
        throw new global.err({
            code: 200,
            data: {},
            msg: '启用成功!'
        })
    }

    static async loginOut(ctx) {
        // 移除redis
        await global.client.SREM('token', ctx.req.headers.authorization)

        throw new global.err({
            code: 200,
            data: {},
            msg: 'ok！'
        })
    }

    static async getUserInfo(ctx) {
        let user = await User.findOne({
            where: {
                id: ctx.auth.uid
            }
        })

        throw new global.err({
            code: 200,
            data: user,
            msg: 'ok!'
        })
    }
}

User.init(
    {
        nickName: {
            type: DataTypes.STRING(10)
        },
        account: {
            type: DataTypes.STRING(11)
        },
        password: {
            type: DataTypes.STRING
        },
        headImg: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'user' // 我们需要选择模型名称
}
)

module.exports = User