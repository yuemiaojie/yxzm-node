const { LinValidator, Rule } = require('../static/lin-validator-v2')


class ValidationUpdBlogList extends LinValidator {
    constructor() {
        super()

        this.title = [new Rule('isLength', '长度在 2 到 10 个字符', { min: 2, max: 10 })]
        this.statement = [new Rule('isLength', '长度在 10 到 100 个字符', { min: 10, max: 100 })]
        this.content = [new Rule('isLength', '最小长度为 200 个字符', { min: 200 })]
    }

    // 校验Id 
    validateId(data) {
        const { id } = data.body
        if (id && typeof id !== 'number') {
            throw new global.err({
                code: 500,
                msg: 'id为正整数'
            })
        }
    }

    // 校验tags是否为数组
    validateTags(data) {
        const { tags } = data.body
        return Array.isArray(tags)
    }
}

class ValidationGetBlogListDetail extends LinValidator {
    constructor() {
        super()

        this.id = [new Rule('isInt', '标签id需要是正整数!')]
    }
}

class ValidationDelBlogList extends ValidationGetBlogListDetail {
    constructor() {
        super()
    }
}



module.exports = {
    ValidationUpdBlogList,
    ValidationGetBlogListDetail,
    ValidationDelBlogList
}