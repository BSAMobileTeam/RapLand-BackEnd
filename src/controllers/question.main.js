require('dotenv').config()
const Question = require('../models/question.main')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET, VERSION="1.0.1"} = process.env

function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
<<<<<<< HEAD
        if(token === null)
            return res.sendStatus(401)
=======
        if(token == null) 
            return res.sendStatus(401)
    
>>>>>>> 01f68bf729d11900299f50826f3daebd13631d3d
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
<<<<<<< HEAD
        if ((await Question.findOne({ where: { title: req.body.title }})) === null) {
=======
        if((await Question.findOne({ where: { title: req.body.title }})) == null){
>>>>>>> 01f68bf729d11900299f50826f3daebd13631d3d
            const newQuestion = await Question.create(req.body)
            res.status(201).json(newQuestion)
        } else {
            res.status(401).send('This question already exists')
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

const getById = async (req, res) => {
    try {
        const question = {}
        if((question = await Question.findByPk(req.query.id)) != null){
            res.status(200).json(question)
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getAll = async (req, res) => {
    try {
        const questions = await Question.findAll()
        res.status(200).json(questions)
    } catch (error) {
        res.sendStatus(404)
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
        res.status(200).json(mixedArray)
    } catch (error) {
        res.sendStatus(404)
    }
}

const createWithArray = async (req, res) => {
    try {
        const array = []
        for (const question of req.body) {
            if((await Question.findOne({ where: { title: question.title } })) == null){
                array.push(await Question.create(question))
            } else {
                array.push({ "error": "Duplicate"})
            }
        }
        return res.status(201).json(array)
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
