
const { validate } = require('../validators/index');
const {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray,    
} = require('../validators/question.main')
const { checkDeleteQuestion } = require('../validators/question.index')

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
    
    router.post(
        '/create',
        checkCreateQuestion,
        [validate, mainController.apiKeyCheck, mainController.create]
    )
    
    router.post(
        '/createWithArray',
        checkCreateQuestionWithArray,
        [validate, mainController.apiKeyCheck, mainController.createWithArray])
    
    router.put('/update',
        
        [mainController.apiKeyCheck, mainController.updateQuestion]
    )

    router.delete(
        '/deleteById',
        checkDeleteQuestion,
        [validate, mainController.apiKeyCheck, mainController.deleteById]
    )
 
    router.get(
        '/getById',
        checkGetQuestionById,
        [validate, mainController.getById]
    )
    

    router.get('/getMixedArray', mainController.getMixedArray)
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/count', mainController.getCount)

    app.use('/question', router)
}
