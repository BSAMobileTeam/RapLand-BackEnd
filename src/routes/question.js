const sequelize = require('../sequelize')

module.exports = app => {
    const controller = require('../controllers/question')
    const router = require('express').Router()
 
    router.post('/create', controller.create)

    router.get('/getById', controller.getById)

    router.get('/getAll', controller.getAll)

    router.get('/getMixedArray', controller.getMixedArray)

    router.post('/createWithArray', controller.createWithArray)

    app.use('/question', router)
}
