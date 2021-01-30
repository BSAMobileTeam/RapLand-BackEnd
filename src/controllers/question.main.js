require('dotenv').config()
const Question = require('../models/question.main')

const {
    DEFAULT_MIXED_ARRAY_LENGTH,
    GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS
} = process.env

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
        return question !== null ? res.status(200).json(question) : res.status(404).send(`This question ID doesn't exist : ${req.query.id}`)
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

const getMixedArray = async (req, res) => {
    try {
        const questions = await (await Question.findAll()).filter(question => question.game.includes(req.query.game))
        if (questions.length <= 0) {
            return res.status(404).send("There are no available questions")
        }
        const length = req.query.length <= questions.length ? req.query.length : questions.length
        const mixedArray = []
        const startDate = Date.now()

        while (mixedArray.length < length) {
            if (Date.now() - startDate >= GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS) {
                return res.status(504).send(`Can't generate a mixed array in less than ${GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS} milliseconds. Try with a smaller size.`)
            }
            const newQuestion = questions[Math.floor(Math.random() * questions.length)]
            if (mixedArray.includes(newQuestion) === false) {
                mixedArray.push(newQuestion)
            }
        }
        return res.status(200).json(mixedArray)
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
            return res.status(404).send(`This question ID doesn't exist : ${req.query.id}`)
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
            return res.status(404).send(`This question ID doesn't exist : ${req.query.id}`)
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
    create,
    getById,
    getAll,
    getCount,
    getMixedArray,
    updateQuestion,
    createWithArray,
    deleteById
}
