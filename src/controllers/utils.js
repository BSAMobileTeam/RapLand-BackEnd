const User = require('../models/user')
const Question = require('../models/question.main')
const CommunityQuestion = require('../models/question.community')

const exportMain = async (req, res) => {
    try {
        const questions = await Question.findAll()
        const users = await User.findAll()
        res.setHeader('Content-disposition', `attachment; filename= mainDatabaseExport-${new Date()}.json`)
        res.setHeader('Content-type', 'application/json')
        return res.write(JSON.stringify({
            questions: questions,
            users: users
        }), (err) => {
            res.end()
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

const exportCommunity = async (req, res) => {
    try {
        const communityQuestions = await CommunityQuestion.findAll()
        res.setHeader('Content-disposition', `attachment; filename= communityDatabaseExport-${new Date()}.json`)
        res.setHeader('Content-type', 'application/json')
        return res.write(JSON.stringify({
            communityQuestions: questions,
        }), (err) => {
            res.end()
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = {
    exportMain,
    exportCommunity
}