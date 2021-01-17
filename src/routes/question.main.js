
const { validate } = require('../validators/index')
const {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray
} = require('../validators/question.main')

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
 
    router.get(
        '/getById',
        checkGetQuestionById,
        [validate, mainController.getById]
    )
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/getMixedArray', mainController.getMixedArray)
    
    router.get('/count', mainController.getCount)
    
    router.post('/updateQuestion',
        [mainController.apiKeyCheck, mainController.updateQuestion]
    )
    
    router.post(
        '/create',
        checkCreateQuestion,
        [validate, mainController.apiKeyCheck, mainController.create]
    )
    
    router.post(
        '/createWithArray',
        checkCreateQuestionWithArray,
        [validate, mainController.apiKeyCheck, mainController.createWithArray])
    
    router.delete('/deleteById', [mainController.apiKeyCheck, mainController.deleteById])

    app.use('/question', router)
}
