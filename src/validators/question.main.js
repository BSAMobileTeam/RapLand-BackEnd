const { body, query } = require('express-validator');

const {
    checkGame,
    checkGameMode,
    checkGameModeForArray,
    checkChoices,
    checkAnswers,
    checkAnswersForArray,
    checkQuestionType,
    checkMediaType
} = require('./question.index')

const checkCreateQuestion = [
    header('authorization').exists(),
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
    header('authorization').exists(),
    body('*.id').isEmpty(),
    body('*.game').custom(checkGame),
    body('*.gameMode').custom(checkGameModeForArray),
    body('*.type').custom(checkQuestionType),
    body('*.title').isString().notEmpty().isLength({min: 1, max: 255}),
    body('*.choices').custom(checkChoices),
    body('*.answers').custom(checkAnswersForArray),
    body('*.mediaType').custom(checkMediaType).optional(),
    body('*.mediaUrl').isURL().optional()
]

const checkUpdateQuestion = [
    header('authorization').exists(),
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

const checkGetMixedQuestionArray = [
    query('length').isNumeric().isLength({min: 1, max: 50}).optional()
]

module.exports = {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray,
    checkUpdateQuestion,
    checkGetMixedQuestionArray
}
