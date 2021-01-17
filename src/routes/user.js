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
        
    router.delete('/logout', userController.logout)

    router.post('/token', userController.token)

    app.use('/user', router)
}
