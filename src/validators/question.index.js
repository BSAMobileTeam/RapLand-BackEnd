
const { query } = require('express-validator')

const questionTypes = [
    'opened',
    'closed',
    'mcq',
    'trueOrFalse'
]

const questionMediaTypes = [
    'image',
    'video',
    'audio'
]

const games = [
    'rapjeu'
]

const gameModes = {
    "rapjeu": [
        'solo',
        'multi',
        'rapjeu',
        'party',
        'old school'
    ]
}

const checkGame = value => {    
    if (!Array.isArray(value)) {
        throw new Error('game is not an array')
    }
    if (value.length < 1) {
        throw new Error('game must have at least one element')
    }
    value.forEach(v => {
        if (typeof v !== 'string' || !games.includes(v)) {
            throw new Error(`game contains an invalid value : ${v}`)
        }
    })
    return true
}

const checkGameMode = (value, { req }) => {
    if (!Array.isArray(value)) {
        throw new Error('gameMode is not an array')
    }
    if (value.length < 1) {
        throw new Error('gameMode must have at least one element')
    }    
    value.forEach(v => {
        if (
            typeof v !== 'string' || !gameModes[req.body.game].includes(v)
        ) {
            throw new Error(`gameMode contains an invalid value : ${v}`)
        }
    })
    return true
}

const checkGameModeForArray = (value, { req, _, path }) => {  
    if (!Array.isArray(value)) {
        throw new Error('gameMode is not an array')
    }
    if (value.length < 1) {
        throw new Error('gameMode must have at least one element')
    }
    const index = parseInt(path.substring(1, path.indexOf(']')))
    value.forEach(v => {        
        if (
            typeof v !== 'string' || !gameModes[req.body[index].game].includes(v)
        ) {
            throw new Error(`gameMode contains an invalid value : ${v}`)
        }
    })
    return true
}

const checkChoices = value => {
    if (!Array.isArray(value)) {
        throw new Error('choices is not an array')
    }
    if (value.length < 1) {
        throw new Error('choices must have at least one element')
    }
    value.forEach(v => {
        if (
            typeof v !== 'string' && typeof v != 'number'
        ) {
            throw new Error(`choices contains an invalid value : ${v}`)
        }
    })
    return true
}

const checkAnswers = (value, { req, _, path }) => {
    const index = parseInt(path.substring(1, path.indexOf(']')))
    if (!req.body[index]["choices"]) {
        throw new Error('There is no choices')
    }
    if (checkChoices(req.body[index]["choices"]) !== true) {
        throw new Error('There is an error in the choices')
    }
    if (!Array.isArray(value)) {
        throw new Error('answers is not an array')
    }
    if (value.length < 1) {
        throw new Error('answers must have at least one element')
    }
    value.forEach(v => {        
        if (!req.body[index]["choices"].includes(v)) {
            throw new Error(`This answer is not in the choices array: ${v}`)
        }
    })
    return true
}

const checkQuestionType = value => {    
    if (typeof value !== 'string') {
        throw new Error("type must be a string")
    }
    if (!questionTypes.includes(value)) {
        throw new Error(`type must be one of ${questionTypes.join(" or ")}`)
    }
    return true
}

const checkMediaType = value => {
    if (typeof value !== 'string') {
        throw new Error("mediaType must be a string")
    }
    if (!questionMediaTypes.includes(value)) {
        throw new Error(`mediaType must be one of ${questionMediaTypes.join(" or ")}`)
    }
    return true
}

const checkDeleteQuestion = [
    query('apiKey').isString().notEmpty(),
    query('id').isUUID(4)
]


module.exports = {
    checkGame,
    checkGameMode,
    checkGameModeForArray,
    checkChoices,
    checkAnswers,
    checkQuestionType,
    checkMediaType,
    checkDeleteQuestion
}