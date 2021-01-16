const { body, validationResult } = require('express-validator');

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
 
    router.get('/getById', mainController.getById)
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/getMixedArray', mainController.getMixedArray)
    
    router.get('/count', mainController.getCount)
    
    router.post('/updateQuestion', [mainController.apiKeyCheck, mainController.updateQuestion])
    
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
    [mainController.apiKeyCheck, mainController.create])
    
    router.post('/createWithArray', [mainController.apiKeyCheck, mainController.createWithArray])
    
    router.delete('/deleteById', [mainController.apiKeyCheck, mainController.deleteById])

    app.use('/question', router)
}

