const { LinValidator, Rule } = require('../static/lin-validator-v2')
const NodeRSA = require('node-rsa');


class ValidationAddUserList extends LinValidator {
    constructor() {
        super()

        this.nickName = [new Rule('isLength', '长度在 2 到 10 个字符', { min: 2, max: 10 })]
        this.account = [new Rule('isLength', '长度在 5 到 20 个字符', { min: 5, max: 20 })]
        this.password = []
        this.headImg = [new Rule('isURL', '开头为https', { protocols: ['https'] })]
    }
}

class ValidationDisUserList extends LinValidator {
    constructor() {
        super()

        this.id = [new Rule('isInt', 'id为正整数')]
    }
}

class ValidationStaUserList extends ValidationDisUserList {
}



module.exports = {
    ValidationAddUserList,
    ValidationDisUserList,
    ValidationStaUserList
}