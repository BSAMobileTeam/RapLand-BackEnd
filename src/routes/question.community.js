module.exports = app => {
    const communityController = require('../controllers/question.community')
    const router = require('express').Router()
    
    router.get('/ping', communityController.ping)
    
    router.get('/getById', communityController.getById)
    
    router.get('/getAll', communityController.getAll)
    
    router.get('/getMixedArray', communityController.getMixedArray)
    
    router.get('/count', communityController.getCount)
    
    router.put('/updateQuestion', communityController.updateQuestion)
    
    router.post('/create', communityController.create)
    
    router.post('/createWithArray', communityController.createWithArray)
    
    router.delete('/deleteById', communityController.deleteById)
    
    app.use('/communityQuestion', [communityController.apiKeyCheck, router])
}
