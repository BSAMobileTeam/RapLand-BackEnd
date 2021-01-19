
const { validate } = require('../validators/index');
const {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray,
    checkUpdateQuestion,
    checkedGetMixedQuestionArray
} = require('../validators/question.main')
const { checkDeleteQuestion } = require('../validators/question.index')

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
    
    router.post(
        '/create',
        checkCreateQuestion,
        [validate, mainController.authenticateAdmin, mainController.create]
    )
    
    router.post(
        '/createWithArray',
        checkCreateQuestionWithArray,
        [validate, mainController.authenticateAdmin, mainController.createWithArray])
    
    router.put(
        '/update',
        checkUpdateQuestion,
        [validate, mainController.authenticateAdmin, mainController.updateQuestion]
    )

    router.delete(
        '/deleteById',
        checkDeleteQuestion,
        [validate, mainController.authenticateAdmin, mainController.deleteById]
    )
 
    router.get(
        '/getById',
        checkGetQuestionById,
        [validate, mainController.getById]
    )

    router.get(
        '/getMixedArray',
        checkedGetMixedQuestionArray,
        [validate, mainController.getMixedArray]
    )
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/count', mainController.getCount)

    app.use('/question', router)
}
