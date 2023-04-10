const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')

class BlogTagList extends Model {
    // 获取博客标签列表
    static async getBlogTagList() {
        const res = await BlogTagList.findAndCountAll()
        if (res) {
            // 提示用户
            throw new global.err({
                code: 200,
                data: res,
                msg: 'ok!'
            })
        }
    }

    // 新增博客标签列表
    static async addBlogTagList(data) {
        const res = await BlogTagList.create(data)
        // 提示用户
        throw new global.err({
            code: 200,
            data: res,
            msg: '博客标签新增成功!'
        })
    }

    // 获取博客标签详情
    static async getBlogTagListDetail(data) {
        const { id } = data
        const res = await BlogTagList.findOne({ where: { id } })
        if (!res) {
            // 提示用户
            throw new global.err({
                code: 500,
                data: null,
                msg: '该标签数据对应的id不存在!'
            })
        }
        // 提示用户
        throw new global.err({
            code: 200,
            data: res,
            msg: 'ok!'
        })
    }

    // 更新博客标签列表
    static async updBlogTagList(data) {
        const { id } = data
        // 编辑状态
        const tagInfoRes = await BlogTagList.findOne({
            where: { id }
        })
        if (!tagInfoRes) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '该标签数据对应的id不存在!'
            })
        }

        // 更新
        tagInfoRes.set(data)
        // 保存更新
        await tagInfoRes.save()

        throw new global.err({
            code: 200,
            data: {},
            msg: '标签数据编辑成功!'
        })
    }

    // 删除博客标签
    static async delBlogTagList(data) {
        const { id } = data
        const tagInfoRes = await BlogTagList.findOne({ where: { id } })
        if (!tagInfoRes) {
            throw new global.err({
                code: 500,
                data: {},
                msg: '该标签数据对应的id不存在!'
            })
        }
        // 删除
        await tagInfoRes.destroy()

        throw new global.err({
            code: 200,
            data: {},
            msg: '标签数据删除成功!'
        })
    }
}

BlogTagList.init(
    {
        tagName: {
            type: DataTypes.STRING
        },
        tagColor: {
            type: DataTypes.STRING
        }
    }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'blog_tag_list' // 我们需要选择模型名称
}
)

module.exports = BlogTagList