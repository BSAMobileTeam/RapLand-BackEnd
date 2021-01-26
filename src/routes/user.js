const { validate } = require('../validators/index');
const {
    checkGetUser,
    checkAddScore,
    checkRegister,
    checkLogin,
    checkDeleteById,
    checkGetByUsername,
    checkGetByEmail,
    checkGetById,
    checkUpdateUser,
    checkUpdateUserById,
    checkChangeAdmin,
    checkCount
} = require('../validators/user')

/**
 * 
 * is getUser usefeul ?
 */

module.exports = app => {
    const userController = require('../controllers/user')
    const router = require('express').Router()
    
    router.get(
        '/getUser',
        checkGetUser, 
        [validate, userController.authenticateToken, userController.getUser])
    
    router.post(
        '/addScore',
        checkAddScore,
        [validate, userController.authenticateToken, userController.addScore])

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
    
    router.delete(
        '/deleteById',
        checkDeleteById, 
        [validate, userController.authenticateAdmin, userController.deleteById])

    router.get(
        '/getByUsername', 
        checkGetByUsername,
        [validate, userController.authenticateAdmin, userController.getByUsername])

    router.get(
        '/getByEmail',
        checkGetByEmail,
        [validate, userController.authenticateAdmin, userController.getByEmail])
    
    router.get(
        '/getById',
        checkGetById,
        [validate, userController.authenticateAdmin, userController.getById])
        
    router.get(
        '/getAll',
        [validate, userController.authenticateAdmin, userController.getAll])
    
    router.get(
        '/count',
        checkCount, 
        [validate, userController.authenticateAdmin, userController.count])
    
    router.put(
        '/updateUser',
        checkUpdateUser,
        [validate, userController.authenticateAdmin, userController.updateUser])

	router.put(
        '/updateUserById', 
        checkUpdateUserById,
        [validate, userController.authenticateAdmin, userController.updateUserById])
    
    router.put(
        '/changeAdmin',
        checkChangeAdmin,
        [validate, userController.authenticateAdmin, userController.changeAdmin])

    app.use('/user', router)
}
