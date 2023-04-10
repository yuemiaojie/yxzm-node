const { LinValidator, Rule } = require('../static/lin-validator-v2')


class ValidationBlogTagList extends LinValidator {
    constructor() {
        super()

        this.tagName = [new Rule('isLength', '长度在 2 到 10 个字符', { min: 2, max: 10 })]
        this.tagColor = []
    }

    validateId(data) {
        const { id } = data.body
        if (id && typeof id !== 'number') {
            throw new global.err({
                code: 500,
                msg: '标签id需要是正整数!'
            })
        }
    }
}

class ValidationGetBlogTagListDetail extends LinValidator {
    constructor() {
        super()

        this.id = [new Rule('isInt', '标签id需要是正整数!')]
    }
}

class ValidationDelBlogTagList extends ValidationGetBlogTagListDetail {
    constructor() {
        super()
    }
}

module.exports = {
    ValidationBlogTagList,
    ValidationGetBlogTagListDetail,
    ValidationDelBlogTagList
}