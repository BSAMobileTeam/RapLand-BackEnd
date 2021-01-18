const { validate } = require('../validators/index')
const {
    checkCreateCommunityQuestion
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
        [validate, communityController.create]
    )
    
    router.post('/createWithArray', communityController.createWithArray)

    router.post('/updateQuestion', communityController.updateQuestion)
    
    router.delete(
        '/deleteById',
        checkDeleteQuestion,
        [validate, communityController.apiKeyCheck, communityController.deleteById]
    )
    
    
    //TODO: move this
    router.get('/ping', communityController.ping)
    
    router.get(
        '/getById',
        query('id').isUUID(4),
        [validate, communityController.getById]
    )
    
    router.get('/getAll', communityController.getAll)
    
    router.get('/getMixedArray', communityController.getMixedArray)
    
    router.get('/count', communityController.getCount)
    
    app.use('/communityQuestion', router)
}
