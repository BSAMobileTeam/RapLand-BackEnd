module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.get('/getUser', userController.authenticateToken, userController.getUser)
    
    router.post('/addScore', userController.authenticateToken, userController.addScore)

    router.post('/register', userController.create)
    
    router.post('/login', userController.login)
        
    router.delete('/logout', userController.logout)

    // Admin
    
    router.delete('/deleteById', userController.authenticateToken, userController.deleteById)

    router.get('/getByUsername', userController.authenticateToken, userController.getByUsername)

    router.get('/getByEmail', userController.authenticateToken, userController.getByEmail)
    
    router.get('/getById', userController.authenticateToken, userController.getById)
        
    router.get('/getAll', userController.authenticateToken, userController.getAll)
    
    router.get('/count', userController.authenticateToken, userController.count)
    
    router.put('/updateUser', userController.authenticateToken, userController.updateUser)
    
    router.put('/changeAdmin', userController.authenticateToken, userController.changeAdmin)

    app.use('/user', router)
}
