const mainDatabase = require('../main.sequelize')

const { DataTypes } = require('sequelize')

const User = mainDatabase.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bought: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User
