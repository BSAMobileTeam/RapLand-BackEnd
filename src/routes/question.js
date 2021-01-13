const sequelize = require('../sequelize')

module.exports = app => {
    const controller = require('../controllers/question')
    const router = require('express').Router()

    router.post('/create', [controller.apiKeyCheck, controller.create])

    router.get('/getById', controller.getById)

    router.get('/getAll', [controller.apiKeyCheck, controller.getAll])

    router.get('/getMixedArray', controller.getMixedArray)

    router.post('/createWithArray', [controller.apiKeyCheck, controller.createWithArray])

    router.delete('/deleteById', [controller.apiKeyCheck, controller.deleteById])

    app.use('/question', router)
}
