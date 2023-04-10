const { Sequelize } = require('sequelize')


const db = require('../config')[process.env.NODE_ENV === 'development' ? 'db_dev' : 'db_pro']

const { database, username, password, host, dialect, port } = db

const sequelize = new Sequelize(database, username, password, {
    host, // ip
    dialect, // 数据库
    port, // 端口
    define: {
        freezeTableName: true,
        underscored: true
    }
})

sequelize.sync({
    alter: true // - 数据库与模型达到匹配（数据类型，字段...）
})

module.exports = sequelize
