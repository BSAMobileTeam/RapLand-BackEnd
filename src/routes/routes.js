const sequelize = require('../sequelize')

module.exports = app => {
    const mainController = require('../controllers/question')
    const secondController = require('../controllers/questionTmp')
    const mainRouter = require('express').Router()
    const secondRouter = require('express').Router()

    mainRouter.get('/ping', mainController.ping)

    mainRouter.get('/getById', mainController.getById)

    mainRouter.get('/getAll', mainController.getAll)

    mainRouter.get('/getMixedArray', mainController.getMixedArray)

    mainRouter.get('/count', mainController.getCount)

    mainRouter.post('/updateQuestion', [mainController.apiKeyCheck, mainController.updateQuestion])

    mainRouter.post('/create', [mainController.apiKeyCheck, mainController.create])

    mainRouter.post('/createWithArray', [mainController.apiKeyCheck, mainController.createWithArray])

    mainRouter.delete('/deleteById', [mainController.apiKeyCheck, mainController.deleteById])

    app.use('/question', mainRouter)

    /*---------------2ND DB---------------*/

    app.use('/questionTmp', [secondController.apiKeyCheck, secondRouter])

    secondRouter.get('/ping', secondController.ping)

    secondRouter.get('/getById', secondController.getById)

    secondRouter.get('/getAll', secondController.getAll)

    secondRouter.get('/getMixedArray', secondController.getMixedArray)

    secondRouter.get('/count', secondController.getCount)

    secondRouter.post('/updateQuestion', secondController.updateQuestion)

    secondRouter.post('/create', secondController.create)

    secondRouter.post('/createWithArray', secondController.createWithArray)

    secondRouter.delete('/deleteById', secondController.deleteById)

}
