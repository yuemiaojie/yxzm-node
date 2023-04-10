const { LinValidator, Rule } = require('../static/lin-validator-v2')

class ValidationGetEnglish extends LinValidator {
    constructor() {
        super()

        this.date = [new Rule('isDate', '日期类型')]
    }
}

class ValidationEditEnglish extends ValidationGetEnglish {
    constructor() {
        super()

        this.content = []
    }
}

module.exports = {
    ValidationGetEnglish,
    ValidationEditEnglish
}
