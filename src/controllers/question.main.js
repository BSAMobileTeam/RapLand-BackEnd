require('dotenv').config()
const Question = require('../models/question.main')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET, VERSION="1.0.1"} = process.env

function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        if(token === null)
            return res.sendStatus(401)
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err)
                return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            if(user == null) {
                res.sendStatus(404)
            } else if(user.admin){
                req.user = user.username
                next()
            } else {
                res.sendStatus(403)
            }
        })
    }
    catch (error) {
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
        return question !== null ? res.status(200).json(question) : res.status(404).send("This question ID doesn't exists")
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const questions = await Question.findAll()
        return questions.length > 0 ? res.status(200).json(questions) : res.status(404).send("There are no available questions")
    } catch (error) {
        res.sendStatus(500)
    }
}

const getMixedArray = async (req, res) => {
    try {
        const totalLenght = (await Question.findAll()).length
        const maxLength = (totalLenght > 0 && totalLenght <= 30) ? totalLenght : 30
        const length = (req.query.length && req.query.length > 0 && req.query.length <= 50 && req.query.length <= maxLength) ? req.query.length : maxLength
        const mixedArray = []
        const questions = await Question.findAll()
        
        while (mixedArray.length < length) {
            const newQuestion = questions[Math.floor(Math.random() * questions.length)]
            if (!(newQuestion in mixedArray)) {
                mixedArray.push(newQuestion)
            }
        }
        res.status(201).json(mixedArray)
    } catch (error) {
        res.sendStatus(404)
    }
}

const createWithArray = async (req, res) => {
    try {
        //const error = false
        const array = []
        for (const question of req.body) {
            if((await Question.findOne({ where: { title: question.title } })) == null) {
                array.push(await Question.create(question))
            } else {
                array.push({ "error": "Duplicate"})
                //error = true
            }
        }
        res.status(201).json(array)
        //error ? res.status(206).json(array) : res.status(201).json(array)
    } catch (error) {
        res.sendStatus(401)
    }
}

const deleteById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        await question.destroy()
        res.status(200).send('Deleted')
    } catch (error) {
        res.sendStatus(400)
    }
}

const getCount = async (req, res) => {
    try {
        const questions = await Question.findAll()
        res.status(200).send(""+questions.length)
    } catch (error) {
        res.sendStatus(500)
    }
}

const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        await question.update(req.body, {
            where: { id: req.query.id }
        })
        res.status(200).send(req.body)
    } catch (error) {
	res.sendStatus(404)
    }
}

const ping = (req, res) => {
    try {
        res.status(200).json({
            "version": VERSION
        })
    } catch (error) {
	res.sendStatus(500)
    }
}

module.exports = {
    authenticateAdmin,
    create,
    getById,
    getAll,
    getCount,
    getMixedArray,
    updateQuestion,
    createWithArray,
    deleteById,
    ping
}
