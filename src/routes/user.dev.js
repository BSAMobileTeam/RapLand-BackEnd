module.exports = app => {
    const userController = require('../controllers/user.dev')
    const router = require('express').Router()
    
	router.post('/create', userController.create)

    router.get('/ping', userController.ping)

    router.post('/changeAdmin', userController.changeAdmin)
    
    router.get('/getByUsername', userController.getByUsername)

    router.get('/getByEmail', userController.getByEmail)
    
    router.get('/getById', userController.getById)
        
    router.get('/getAll', userController.getAll)
        
    router.get('/count', userController.getCount)

    router.get('/score', userController.authenticateToken, userController.score) //delete
    
    router.put('/updateUsername', userController.updateUsername)
    
    router.put('/updatePassword', userController.updatePassword)
    
    router.put('/updateEmail', userController.updateEmail)
    
    router.put('/updateUser', userController.updateUser)

    router.post('/login', userController.login)
        
    router.delete('/deleteById', userController.deleteById)
    
    app.use('/userDev', [userController.apiKeyCheck, router])
}
