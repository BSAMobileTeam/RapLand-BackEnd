const { validate } = require('../validators/index')
const checkCreateCommunityQuestion = require('../validators/question.community')

const { query } = require('express-validator')

module.exports = app => {
    const communityController = require('../controllers/question.community')
    const router = require('express').Router()
    
    router.get('/ping', communityController.ping)
    
    router.get(
        '/getById',
        query('id').isUUID(4),
        [validate, communityController.getById]
    )
    
    router.get('/getAll', communityController.getAll)
    
    router.get('/getMixedArray', communityController.getMixedArray)
    
    router.get('/count', communityController.getCount)
    
    router.post('/updateQuestion', communityController.updateQuestion)
    
    router.post(
        '/create',
        checkCreateCommunityQuestion,
        [validate, communityController.create]
    )
    
    router.post('/createWithArray', communityController.createWithArray)
    
    router.delete('/deleteById', communityController.deleteById)
    
    app.use('/communityQuestion', [communityController.apiKeyCheck, router])
}
