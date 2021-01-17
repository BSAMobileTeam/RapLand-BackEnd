const { body, validationResult, check } = require('express-validator');

const { validate } = require('../validators/index')
const { checkCreateQuestion } = require('../validators/question.main')

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
 
    router.get('/getById', mainController.getById)
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/getMixedArray', mainController.getMixedArray)
    
    router.get('/count', mainController.getCount)
    
    router.post('/updateQuestion', [mainController.apiKeyCheck, mainController.updateQuestion])
    
    router.post('/create',
    checkCreateQuestion,
    [validate, mainController.apiKeyCheck, mainController.create])
    
    router.post('/createWithArray', [mainController.apiKeyCheck, mainController.createWithArray])
    
    router.delete('/deleteById', [mainController.apiKeyCheck, mainController.deleteById])

    app.use('/question', router)
}
