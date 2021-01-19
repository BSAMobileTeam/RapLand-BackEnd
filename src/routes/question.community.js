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
    const router = require('express').Router()
    
    router.post(
        '/create',
        checkCreateCommunityQuestion,
        [validate, communityController.authenticateToken, communityController.create]
    )
    
    router.post(
        '/createWithArray',
        checkCreateCommunityQuestionWithArray,
        [validate, communityController.authenticateToken, communityController.createWithArray]
    )

    router.put(
        '/update',
        checkUpdateCommunityQuestion,
        [validate, communityController.authenticateToken, communityController.updateQuestion]
    )
    
    router.delete(
        '/deleteById',
        checkDeleteQuestion,
        [validate, communityController.authenticateAdmin, communityController.deleteById]
    )
    
    router.get(
        '/getById',
        query('id').isUUID(4),
        [validate, communityController.getById]
    )
    
    router.get('/getAll', communityController.getAll)
    

    //TODO: remove this
    router.get('/getMixedArray', communityController.getMixedArray)
    
    router.get('/count', communityController.getCount)
    
    app.use('/communityQuestion', router)
}
