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
        body('mediaType').isString().optional(),
        body('mediaUrl').isString().optional(),
    ],
]

module.exports = {
    checkCreateQuestion
}