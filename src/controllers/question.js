const Question = require('../models/question')

const create = async (req, res) => {
    try {
        await Question.create(req.body)   
    } catch (error) {
        res.status(error.status)
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
