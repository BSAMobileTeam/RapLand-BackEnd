const { body } = require('express-validator');

const { checkGame, checkGameMode, checkChoices, checkAnswers } = require('./index')

const checkCreateQuestion = [
    [
        body('id').isEmpty(),
        body('game').custom(checkGame),
        body('gameMode').custom(checkGameMode),
        body('type').isString().notEmpty(),
        body('title').isString().notEmpty(),
        body('choices').custom(checkChoices),
        body('answers').custom(checkAnswers),
        body('mediaType').isString().isIn(['image', 'video', 'audio']).optional().withMessage('mediaType must be "image", "video" or "audio"'),
        body('mediaUrl').isURL().optional()
    ],
]

module.exports = {
    checkCreateQuestion
}