const sequelize = require('../sequelize')

const { DataTypes } = require('sequelize')

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    game: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    gameMode: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    type: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
    },
    choices: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    answer: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Question
