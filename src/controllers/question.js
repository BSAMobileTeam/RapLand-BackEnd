const Question = require('../models/question')

const create = async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body)
        res.status(201).json(newQuestion)
    } catch (error) {
        res.sendStatus(401)
    }
}

const getById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id)
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
        res.sendStatus(200).json(mixedArray)
    } catch (error) {
        res.sendStatus(404)
    }
}

module.exports = {
    create,
    getById,
    getAll,
    getMixedArray
}
