require('dotenv').config()
let { Sequelize } = require('sequelize')

let sequelize = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize

