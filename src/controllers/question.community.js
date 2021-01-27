const communityQuestion = require('../models/question.community')

const create = async (req, res) => {
    try {
        return res.status(201).json(await communityQuestion.create(req.body))
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).send(`The question "${req.body.title}" already exists`)
        }
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const question = await communityQuestion.findByPk(req.query.id)
        return question !== null ? res.status(200).json(question) : res.status(404).send(`This question ID doesn't exists : ${req.query.id}`)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const questions = await communityQuestion.findAll()
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
                await communityQuestion.create(question)
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
        const question = await communityQuestion.findByPk(req.query.id)
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
        return res.status(200).send(await (await communityQuestion.count()).toString())
    } catch (error) {
        return res.sendStatus(500)
    }
}

const updateQuestion = async (req, res) => {
    try {
        const question = await communityQuestion.findByPk(req.query.id)
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
    create,
    getById,
    getAll,
    getCount,
    updateQuestion,
    createWithArray,
    deleteById
}
