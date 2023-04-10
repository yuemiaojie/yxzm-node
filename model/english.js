const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')

class English extends Model {
    // 获取当天英语数据
    static async getEnglish({ date }) {
        const res = await English.findOne({
            where: {
                date: date
            }
        })

        // 提示用户
        throw new global.err({
            code: 200,
            data: res,
            msg: 'ok!'
        })
    }

    static async editEnglist({ date, content }) {
        const res = await English.findOne({
            where: {
                date: date
            }
        })

        // 如果没有则新增，否则更新
        if (!res) {
            English.create({ date, content })
        } else {
            // 更新
            res.set({ date, content })
            // 保存更新
            await res.save()
        }

        // 提示用户
        throw new global.err({
            code: 200,
            data: {},
            msg: '成功!'
        })
    }
}

English.init(
    {
        date: {
            type: DataTypes.DATEONLY
        },
        content: {
            type: DataTypes.STRING(10000)
        }
    }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'english' // 我们需要选择模型名称
}
)

module.exports = English