const { body, query, header } = require('express-validator');

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

const checkCreateCommunityQuestion = [
    header('authorization').exists(),
    body('id').isEmpty(),
    body('author').isString().notEmpty().isLength({min: 1, max: 255}),
    body('game').custom(checkGame),
    body('gameMode').custom(checkGameMode),
    body('type').custom(checkQuestionType),
    body('title').isString().notEmpty().isLength({min: 1, max: 255}),
    body('choices').custom(checkChoices),
    body('answers').custom(checkAnswers),
    body('mediaType').custom(checkMediaType).optional(),
    body('mediaUrl').isURL().optional()
]

const checkCreateCommunityQuestionWithArray = [
    header('authorization').exists(),
    body('*.id').isEmpty(),
    body('*.author').isString().notEmpty().isLength({min: 1, max: 255}),
    body('*.game').custom(checkGame),
    body('*.gameMode').custom(checkGameModeForArray),
    body('*.type').custom(checkQuestionType),
    body('*.title').isString().notEmpty().isLength({min: 1, max: 255}),
    body('*.choices').custom(checkChoices),
    body('*.answers').custom(checkAnswersForArray),
    body('*.mediaType').custom(checkMediaType).optional(),
    body('*.mediaUrl').isURL().optional()
]

const checkUpdateCommunityQuestion = [
    header('authorization').exists(),
    body('id').isEmpty().optional(),
    body('author').isString().notEmpty().isLength({min: 1, max: 255}).optional(),
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
    checkCreateCommunityQuestion,
    checkCreateCommunityQuestionWithArray,
    checkUpdateCommunityQuestion
}
