const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

class BlogList extends Model {
    // 获取博客列表
    static async getBlogList() {
        const res = await BlogList.findAndCountAll()
        if (res) {
            // 提示用户
            throw new global.err({
                code: 200,
                data: res,
                msg: 'ok!'
            })
        }
    }

    // 新增博客列表
    static async addBlogList(data, userId) {
        const userRes = await User.findOne({
            where: { id: userId }
        })
        if (!userRes) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '用户不存在!'
            })
        }

        const authorInfo = {
            nickName: userRes.nickName,
            headImg: userRes.headImg
        }
        await BlogList.create({ ...data, authorInfo })

        // 提示用户
        throw new global.err({
            code: 200,
            data: {},
            msg: '博客标签新增成功!'
        })
    }


    // 获取博客详情
    static async getBlogListDetail(data) {
        const { id } = data
        const blogList = await BlogList.findOne({ where: { id } })
        if (!blogList) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: {},
                msg: '该数据对应的id不存在!'
            })
        }
        // 提示用户
        throw new global.err({
            code: 200,
            data: blogList,
            msg: 'ok!'
        })
    }

    static async updBlogList(data) {
        const { id } = data
        // 编辑状态
        const blogList = await BlogList.findOne({
            where: { id }
        })
        if (!blogList) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '该数据对应的id不存在!'
            })
        }

        // 更新
        blogList.set(data)
        // 保存更新
        await blogList.save()

        throw new global.err({
            code: 200,
            data: {},
            msg: 'ok!'
        })
    }

    static async delBlogList(data) {
        const { id } = data
        const blogList = await BlogList.findOne({
            where: { id }
        })
        if (!blogList) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '该数据对应的id不存在!'
            })
        }
        // 删除
        await blogList.destroy()

        throw new global.err({
            code: 200,
            data: {},
            msg: 'ok!'
        })
    }
}

BlogList.init(
    {
        title: {
            type: DataTypes.STRING
        },
        statement: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.STRING,
            set(val) {
                this.setDataValue("tags", JSON.stringify(val ?? ""));
            },
            get() {
                const rawValue = this.getDataValue('tags');
                return rawValue ? JSON.parse(rawValue) : [];
            }
        },
        authorInfo: {
            type: DataTypes.STRING,
            set(val) {
                this.setDataValue("authorInfo", JSON.stringify(val ?? ""));
            },
            get() {
                const rawValue = this.getDataValue('authorInfo');
                return rawValue ? JSON.parse(rawValue) : {};
            },
            type: DataTypes.STRING(1000)
        },
        step: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING(10000)
        }
    }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'blog_list' // 我们需要选择模型名称
}
)

module.exports = BlogList