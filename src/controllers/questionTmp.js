require('dotenv').config()
const Question = require('../models/question')

const {API_KEYV2, VERSION="1.0.1"} = process.env

const apiKeyCheck = (req, res, next) => {
	if(req.query.apiKey == API_KEYV2)
		next()
	else {
		res.sendStatus(401)
	}
}

/**
 * for create and create withArray
 * check if question does not already exists
 */

const create = async (req, res) => {
    try {
        const questions = await (await Question.findAll()).map(question => {
            delete question.id
            delete question.createdAt
            delete question.updatedAt
            return question
        })
        console.log(req.body.title)
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
    } catch {
	res.sendStatus(404)
    }
}

const ping = (req, res) => {
    try {
	res.status(200).json({
	    "version": VERSION
	})
    } catch {
	res.sendStatus(500)
    }
}

module.exports = {
    apiKeyCheck,
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
