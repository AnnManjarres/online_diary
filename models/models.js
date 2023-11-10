let { DataTypes, Sequelize } = require('sequelize')
let sequelize = require('../db/conn')

let User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    }

})

let Entry = sequelize.define('Entries', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    user_id: {
        type: DataTypes.INTEGER,
        require: true,
    },
    date_entry: {
        type: DataTypes.DATEONLY,
        require: true,
        defaultValue: Sequelize.NOW
    },
    content: {
        type: DataTypes.TEXT('long'),
        require: true
    }

})

Entry.belongsTo(User)
User.hasMany(Entry, {
    foreignKey: 'user_id'
})

async function syncTables() {
    await sequelize.sync()
console.log("All tables synced")
}

syncTables()


module.exports = { User, Entry }