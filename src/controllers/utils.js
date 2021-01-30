const User = require('../models/user')
const Question = require('../models/question.main')
const CommunityQuestion = require('../models/question.community')

const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET, API_KEY} = process.env

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token === null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err) return res.sendStatus(403)
            const user = await User.findByPk(id)
            if (user !== null) {
                req.headers.user = user
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
                
        if(token === null) {
            return res.status(401).send("You must be connected as an administrator to access this ressource.")
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if (err) {
                return res.status(403).send("You can't access this method because you are not administrator.")
            }
            const user = await User.findByPk(id)
            if (user === null) {
                return res.status(403).send("You can't access this method because you are not administrator.")
            } else if (user.admin === true) {
                req.headers.user = user
                next()
            } else {
                return res.status(403).send("You can't access this method because you are not administrator.")
            }
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

const checkApiKey = async (req, res, next) => {
    try {
        if (req.query.apiKey === API_KEY) {
            next()
        } else {
            return res.status(403).send("An API KEY is required to access this method.")
        }

    } catch (error) {
        return res.sendStatus(500)
    }
}

const exportMain = async (req, res) => {
    try {
        const questions = await Question.findAll({
            attributes: { exclude: ['id'] }
        })
        const users = await User.findAll({
            attributes: { exclude: ['id'] }
        })
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
        const communityQuestions = await CommunityQuestion.findAll({
            attributes: { exclude: ['id'] }
        })
        res.setHeader('Content-disposition', `attachment; filename= communityDatabaseExport-${new Date()}.json`)
        res.setHeader('Content-type', 'application/json')
        return res.write(JSON.stringify({
            communityQuestions: communityQuestions,
        }), (err) => {
            res.end()
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = {
    authenticateToken,
    authenticateAdmin,
    checkApiKey,
    exportMain,
    exportCommunity
}
