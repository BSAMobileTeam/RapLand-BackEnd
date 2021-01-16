module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
	router.get('/create', userController.create)

    router.get('/ping', userController.ping)

    router.post('/changeAdmin', userController.changeAdmin)
    
    router.get('/getByUsername', userController.getByUsername)

    router.get('/getByEmail', userController.getByEmail)
    
    router.get('/getById', userController.getById)
        
    router.get('/getAll', userController.getAll)
        
    router.get('/count', userController.getCount)
    
    router.post('/updateUsername', userController.updateUsername)
    
    router.post('/updatePassword', userController.updatePassword)
    
    router.post('/updateEmail', userController.updateEmail)
    
    router.post('/updateUser', userController.updateUser)
        
    router.delete('/deleteById', userController.deleteById)
    
    app.use('/user', [userController.apiKeyCheck, router])
}
