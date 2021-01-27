const { validate } = require('../validators/index')
const {
    checkCreateCommunityQuestion,
    checkCreateCommunityQuestionWithArray,
    checkUpdateCommunityQuestion
} = require('../validators/question.community')
const {
    checkDeleteQuestion
} = require('../validators/question.index')

const { query } = require('express-validator')

module.exports = app => {
    const communityController = require('../controllers/question.community')
    const utilsController = require('../controllers/utils')
    const router = require('express').Router()
    
    router.post(
        '/create',
        checkCreateCommunityQuestion,
        [validate, utilsController.authenticateToken, communityController.create]
    )
    
    router.post(
        '/createWithArray',
        checkCreateCommunityQuestionWithArray,
        [validate, utilsController.authenticateToken, communityController.createWithArray]
    )

    router.put(
        '/update',
        checkUpdateCommunityQuestion,
        [validate, utilsController.authenticateToken, communityController.updateQuestion]
    )
    
    router.delete(
        '/delete',
        checkDeleteQuestion,
        [validate, utilsController.authenticateAdmin, communityController.deleteById]
    )
    
    router.get(
        '/get',
        query('id').isUUID(4),
        [validate, communityController.getById]
    )
    
    router.get('/getAll', communityController.getAll)
    
    router.get('/count', communityController.getCount)
    
    app.use('/communityQuestion', router)
}
