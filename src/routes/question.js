const { body, validationResult } = require('express-validator');

module.exports = app => {
    const controller = require('../controllers/question')
    const router = require('express').Router()
 
    router.post('/create',
    body('id').isEmpty(),
    body('game').isArray({min: 1}),
    body('gameMode').isArray({min: 1}),
    body('type').isString().notEmpty(),
    body('title').isString().notEmpty(),
    body('choices').isArray({min: 1}),
    body('answers').isArray({min: 1}),
    body('mediaType').isString().optional(),
    body('mediaUrl').isString().optional(),
    controller.create)    

    router.get('/getById', controller.getById)

    router.get('/getAll', controller.getAll)

    router.get('/getMixedArray', controller.getMixedArray)

    router.post('/createWithArray', controller.createWithArray)

    app.use('/question', router)
}
