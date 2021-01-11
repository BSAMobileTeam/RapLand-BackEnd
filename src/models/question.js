const sequelize = require('../sequelize')

const { DataTypes } = require('sequelize')

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    intitule: {
        type: DataTypes.STRING,        
    },
    choix: {
        type: DataTypes.STRING
    },
    reponse: {
        type: DataTypes.STRING
    }
})

module.exports = Question
