

module.exports = app => {
    const router = require('express').Router()
    const utilsController = require('../controllers/utils')

    router.get('/exportMain', utilsController.exportMain)

    router.get('/exportCommunity', utilsController.exportCommunity)

    app.use('/utils', router)
}