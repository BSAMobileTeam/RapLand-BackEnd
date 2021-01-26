const sequelize = require('../community.sequelize')

const { DataTypes } = require('sequelize')

const CommunityQuestion = sequelize.define('communityQuestion', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    author: {
        type: DataTypes.STRING
    },
    game: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    gameMode: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    choices: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    answers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.STRING,
    },
    mediaUrl: {
        type: DataTypes.STRING,
    }
})

module.exports = CommunityQuestion
