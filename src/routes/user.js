module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.post('/ping', userController.ping)
                        
    router.post('/score', userController.score)
    
    router.post('/updateUsername', userController.updateUsername)
    
    router.post('/updatePassword', userController.updatePassword)
    
    router.post('/updateEmail', userController.updateEmail)
    
    router.post('/login', userController.login)
        
    router.post('/logout', userController.logout)

    app.use('/user', userController.authenticateToken, router)
}
