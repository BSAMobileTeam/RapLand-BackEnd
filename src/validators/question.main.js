const { body, query } = require('express-validator');

const {
    checkGame,
    checkGameMode,
    checkChoices,
    checkAnswers,
    checkQuestionType,
    checkMediaType
} = require('./question.index')

const checkCreateQuestion = [
    query('apiKey').isString().notEmpty(),
    body('id').isEmpty(),
    body('game').custom(checkGame),
    body('gameMode').custom(checkGameMode),
    body('type').custom(checkQuestionType),
    body('title').isString().notEmpty().isLength({min: 1, max: 255}),
    body('choices').custom(checkChoices),
    body('answers').custom(checkAnswers),
    body('mediaType').custom(checkMediaType).optional(),
    body('mediaUrl').isURL().optional()
]

const checkGetQuestionById = [
    query('id').isUUID(4),
]

const checkCreateQuestionWithArray = [
    query('apiKey').isString().notEmpty(),
    body('*.id').isEmpty(),
    body('*.game').custom(checkGame),
    body('*.gameMode').custom(checkGameMode),
    body('*.type').custom(checkQuestionType),
    body('*.title').isString().notEmpty().isLength({min: 1, max: 255}),
    body('*.choices').custom(checkChoices),
    body('*.answers').custom(checkAnswers),
    body('*.mediaType').custom(checkMediaType).optional(),
    body('*.mediaUrl').isURL().optional()
]

const checkUpdateQuestion = [
    query('apiKey').isString().notEmpty(),
    query('id').isUUID(4),
    body('game').custom(checkGame).optional(),
    body('gameMode').custom(checkGameMode).optional(),
    body('type').custom(checkQuestionType).optional(),
    body('title').isString().notEmpty().isLength({min: 1, max: 255}).optional(),
    body('choices').custom(checkChoices).optional(),
    body('answers').custom(checkAnswers).optional(),
    body('mediaType').custom(checkMediaType).optional(),
    body('mediaUrl').isURL().optional()
]

module.exports = {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray,
    checkUpdateQuestion
}
