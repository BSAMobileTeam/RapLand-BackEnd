const { body } = require('express-validator');

const {
    checkGame,
    checkGameMode,
    checkChoices,
    checkAnswers,
    checkQuestionType,
    checkMediaType
} = require('./question.index')

const checkCreateCommunityQuestion = [
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

module.exports = {
    checkCreateCommunityQuestion
}
