const { LinValidator, Rule } = require('../static/lin-validator-v2')


class ValidationLogin extends LinValidator {
    constructor() {
        super()

        this.account = [new Rule('isLength', '长度在 0 到 11 个字符', { min: 0, max: 11 })]
        this.password = []
        this.code = []
    }
}

module.exports = {
    ValidationLogin
}