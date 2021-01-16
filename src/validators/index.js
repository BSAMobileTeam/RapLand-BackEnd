
const { validationResult } = require('express-validator')

/**
 * Validates the HTTP request data.
 * If everything is OK, it calls the next middleware function,
 * otherwise it sends a JSON error array with status 422.
 *
 * @param {Request} req - HTTP request.
 * @param {Response} res - HTTP response.
 * @param {NextFunction} next - Next function.
 *
 * @see https://express-validator.github.io/docs/
 */
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    }
    else {
        console.log(errors.array())
    //   logger.warn(JSON.stringify(errors.array()))
        res.status(422).json({
            errors: errors.array()
        })
    }
}

const checkGame = value => {
    if (!Array.isArray(value)) {
        throw new Error('game is not an array')
    }
    if (value.length < 1) {
        throw new Error('game must have at least one element')
    }
    value.forEach(v => {
        if (
            typeof v !== 'string' ||
            v !== 'rapjeu'
        ) {
            throw new Error(`game contains an invalid value : ${v}`)
        }
    })
    return true
}

const checkGameMode = value => {
    if (!Array.isArray(value)) {
        throw new Error('gameMode is not an array')
    }
    if (value.length < 1) {
        throw new Error('gameMode must have at least one element')
    }
    value.forEach(v => {
        if (
            typeof v !== 'string' ||
            v !== 'solo' &&
            v !== 'multi' &&
            v !== 'rapjeu' &&
            v !== 'party' &&
            v !== 'old school'
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

const checkAnswers = (value, { req }) => {
    if (!req.body["choices"]) {
        throw new Error('There is no choices')
    }
    if (checkChoices(req.body["choices"]) !== true) {
        throw new Error('There is an error in the choices')
    }
    if (!Array.isArray(value)) {
        throw new Error('answers is not an array')
    }
    if (value.length < 1) {
        throw new Error('answers must have at least one element')
    }
    value.forEach(v => {        
        if (!req.body["choices"].includes(v)) {
            throw new Error(`This answer is not in the choices array: ${v}`)
        }
    })
    return true
}

module.exports = {
    validate,
    checkGame,
    checkGameMode,
    checkChoices,
    checkAnswers
}
