const sequelize = require('../sequelize')

module.exports = app => {
    const controller = require('../controllers/question')
    const router = require('express').Router()
 
    router.post('/create', controller.create)

    router.get('/getById', controller.getById)

    router.get('/getAll', controller.getAll)

    app.use('/question', router)
}
