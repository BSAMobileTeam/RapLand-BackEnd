
const { validationResult } = require('express-validator')
const logger = require('../logger')

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
        logger.warn(JSON.stringify(errors.array()))
        res.status(422).json({
            errors: errors.array()
        })
    }
}

module.exports = {
    validate
}
