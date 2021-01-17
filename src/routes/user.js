module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.post('/ping', userController.ping)
                        
    router.post('/score', userController.authenticateToken, userController.score)
    
    router.post('/email', userController.authenticateToken, userController.email)
    
    router.post('/admin', userController.authenticateToken, userController.admin)

    router.post('/addScore', userController.authenticateToken, userController.addScore)
    
    router.post('/username', userController.authenticateToken, userController.username)
    
    router.post('/updateUsername', userController.authenticateToken, userController.updateUsername)
    
    router.post('/updatePassword', userController.authenticateToken, userController.updatePassword)
    
    router.post('/updateEmail', userController.authenticateToken, userController.updateEmail)
    
    router.post('/login', userController.login)
        
    router.post('/logout', userController.logout)

    app.use('/user', router)
}
