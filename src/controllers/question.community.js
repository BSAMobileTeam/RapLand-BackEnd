require('dotenv').config()
const communityQuestion = require('../models/question.community')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET, VERSION="1.0.1"} = process.env

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err) return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            if(user !== null){
                req.user = user.username
                next()
            } else {
                res.sendStatus(404)
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err) return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            if(user == null){
                res.sendStatus(404)
            } else if(user.admin){
                req.user = user.username
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

const create = async (req, res) => {
    try {
        return res.status(201).json(await Question.create(req.body))
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).send(`The question "${req.body.title}" already exists`)
        }
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        return question !== null ? res.status(200).json(question) : res.status(404).send(`This question ID doesn't exists : ${req.query.id}`)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const questions = await Question.findAll()
        return questions.length > 0 ? res.status(200).json(questions) : res.status(404).send("There are no available questions")
    } catch (error) {
        return res.sendStatus(500)
    }
}

const createWithArray = async (req, res) => {
    try {
        const errors = []

        for (const question of req.body) {
            try {
                await Question.create(question)
            } catch (error) {
                errors.push({
                    error: error.name === "SequelizeUniqueConstraintError" ? "This question already exists" : error.name,
                    question: question
                })
            }
        }
        return errors.length <= 0 ? res.status(201).send("Questions created") : res.status(206).json(errors)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const deleteById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        if (question === null) {
            return res.status(404).send(`This question ID doesn't exists : ${req.query.id}`)
        }
        await question.destroy()
        return res.status(200).send('Deleted')
    } catch (error) {
        res.sendStatus(500)
    }
}

const getCount = async (req, res) => {
    try {        
        return res.status(200).send(await (await Question.count()).toString())
    } catch (error) {
        return res.sendStatus(500)
    }
}

const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        if (question === null) {
            return res.status(404).send(`This question ID doesn't exists : ${req.query.id}`)
        }
        return res.status(200).json(
            await question.update(req.body, {
                where: { id: req.query.id }
            })
        )
    } catch (error) {
	    return res.sendStatus(500)
    }
}

module.exports = {
    authenticateAdmin,
    authenticateToken,
    create,
    getById,
    getAll,
    getCount,
    updateQuestion,
    createWithArray,
    deleteById
}
