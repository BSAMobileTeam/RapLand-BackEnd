module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.get('/getUser', userController.authenticateToken, userController.getUser)
    
    router.post('/addScore', userController.authenticateToken, userController.addScore)

    router.post('/register', userController.create)
    
    router.post('/login', userController.login)
        
    router.delete('/logout', userController.logout)
    
    router.delete('/deleteById', userController.authenticateAdmin, userController.deleteById)

    router.get('/getByUsername', userController.authenticateAdmin, userController.getByUsername)

    router.get('/getByEmail', userController.authenticateAdmin, userController.getByEmail)
    
    router.get('/getById', userController.authenticateAdmin, userController.getById)
        
    router.get('/getAll', userController.authenticateAdmin, userController.getAll)
    
    router.get('/count', userController.authenticateAdmin, userController.count)
    
    router.put('/updateUser', userController.authenticateAdmin, userController.updateUser)

	router.put('/updateUserById', userController.authenticateAdmin, userController.updateUserById)
    
    router.put('/changeAdmin', userController.authenticateAdmin, userController.changeAdmin)

    app.use('/user', router)
}
