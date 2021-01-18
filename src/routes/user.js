module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.get('/ping', userController.ping)
                        
    router.get('/score', userController.authenticateToken, userController.score)
    
    router.get('/email', userController.authenticateToken, userController.email)
    
    router.get('/admin', userController.authenticateToken, userController.admin)

    router.post('/addScore', userController.authenticateToken, userController.addScore)
    
    router.get('/username', userController.authenticateToken, userController.username)
    
    router.put('/updateUsername', userController.authenticateToken, userController.updateUsername)
    
    router.put('/updatePassword', userController.authenticateToken, userController.updatePassword)
    
    router.put('/updateEmail', userController.authenticateToken, userController.updateEmail)
    
    router.post('/login', userController.login)
        
    router.delete('/logout', userController.logout)

    router.post('/token', userController.token)

    app.use('/user', router)
}
