module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.get('/ping', userController.ping)
                        
    router.get('/getUser', userController.authenticateToken, userController.score)

    router.post('/addScore', userController.authenticateToken, userController.addScore)
        
    router.put('/updateUsername', userController.authenticateToken, userController.updateUsername)
    
    router.put('/updatePassword', userController.authenticateToken, userController.updatePassword)
    
    router.put('/updateEmail', userController.authenticateToken, userController.updateEmail)
    
    router.post('/login', userController.login)
        
    router.delete('/logout', userController.logout)

    app.use('/user', router)
}
