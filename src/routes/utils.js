

module.exports = app => {
    const router = require('express').Router()
    const utilsController = require('../controllers/utils')

    router.get('/exportMain', utilsController.checkApiKey, utilsController.exportMain)

    router.get('/exportCommunity', utilsController.checkApiKey, utilsController.exportCommunity)

    app.use('/utils', router)
}