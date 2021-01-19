require('dotenv').config()
const Question = require('../models/question.main')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET, VERSION="1.0.1"} = process.env

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

/**
 * for create and create withArray
 * check if question does not already exists
 */

const create = async (req, res) => {
    try {
        const questions = await  Question.findAll({
            attributes: { exclude: ['id'] }
        })
        console.log(questions)
        if(!(req.body in questions)){
            const newQuestion = await Question.create(req.body)
            res.status(201).json(newQuestion)
        } else {
            res.sendStatus(401).send('Duplicate')
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

const getById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.query.id)
        res.status(200).json(question)
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

/***
 *
 * TODO : change this
*/
const getMixedArray = async (req, res) => {
    try {
        const length = (req.query.length && req.query.length > 0 && req.query.length <= 100) ? req.query.length : 20
        const mixedArray = []
        const questions = await Question.findAll()

        setTimeout(() => {
            while (mixedArray.length <= length) {
                const newQuestion = questions[Math.floor(Math.random() * questions.length)]

                if (!(newQuestion in mixedArray)) {
                    mixedArray.push(newQuestion)
                }
            }
        }, 3000)
        res.status(200).json(mixedArray)
    } catch (error) {
        res.sendStatus(404)
    }
}

const createWithArray = async (req, res) => {
    try {
        const array = []
        const questions = await (await Question.findAll()).map(question => {
            delete question.id
            return question
        })

        for (const question of req.body) {
            await sequelize.transaction(async tran => {
                if (!(question in  questions)) {
                    array.push(await Question.create(question, { transaction: tran }))
                }
            })
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
