const Question = require('../models/question')

const create = async (req, res) => {
    try {
        console.log("BODY = ", req.body)
        const newQuestion = await Question.create(req.body)
        res.status(201).json(newQuestion)
    } catch (error) {
        console.error(error.message)
        res.sendStatus(401)
    }
}

const getById = async (req, res) => {    
    const question = await Question.findByPk(req.params.id)
    res.status(200).json(question)
}

const getAll = async (req, res) => {
    const questions = await Question.findAll()
    res.status(200).json(questions)
}

module.exports = {
    create,
    getById,
    getAll
}
