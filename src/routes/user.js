const { validate } = require('../validators/index');
const {
    checkGetUser,
    checkAddScore,
	checkAddScoreById,
    checkRegister,
    checkLogin,
    checkDeleteById,
    checkGetByUsername,
    checkGetByEmail,
    checkGetById,
    checkUpdateUser,
    checkUpdateUserById,
    checkSetAdmin,
    checkGetAll,
    checkCount
} = require('../validators/user')

module.exports = app => {
    const userController = require('../controllers/user')
    const utilsController = require('../controllers/utils')
    const router = require('express').Router()
    
    router.get(
        '/getUser',
        checkGetUser, 
        [validate, utilsController.authenticateToken, userController.getUser])
    
    router.post(
        '/addScore',
        checkAddScore,
        [validate, utilsController.authenticateToken, userController.addScore])

    router.post(
        '/register',
        checkRegister, 
        [validate, userController.create])
    
    router.post(
        '/login',
        checkLogin, 
        [validate, userController.login])
        
    router.delete(
        '/logout',
        [validate, userController.logout])
    
    router.post(
        '/addScoreById',
        checkAddScoreById,
        [validate, utilsController.authenticateAdmin, userController.addScoreById])

    router.delete(
        '/deleteById',
        checkDeleteById, 
        [validate, utilsController.authenticateAdmin, userController.deleteById])

    router.get(
        '/getByUsername', 
        checkGetByUsername,
        [validate, utilsController.authenticateAdmin, userController.getByUsername])

    router.get(
        '/getByEmail',
        checkGetByEmail,
        [validate, utilsController.authenticateAdmin, userController.getByEmail])
    
    router.get(
        '/getById',
        checkGetById,
        [validate, utilsController.authenticateAdmin, userController.getById])
        
    router.get(
        '/getAll',
        checkGetAll,
        [validate, utilsController.authenticateAdmin, userController.getAll])
    
    router.get(
        '/count',
        checkCount,
        [validate, utilsController.authenticateAdmin, userController.count])
    
    router.put(
        '/updateUser',
        checkUpdateUser,
        [validate, utilsController.authenticateAdmin, userController.updateUser])

	router.put(
        '/updateUserById', 
        checkUpdateUserById,
        [validate, utilsController.authenticateAdmin, userController.updateUserById])
    
    router.put(
        '/setAdmin',
        checkSetAdmin,
        [validate, utilsController.authenticateAdmin, userController.setAdmin])

    app.use('/user', router)
}
