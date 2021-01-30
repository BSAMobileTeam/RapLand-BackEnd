const {
    checkExportMain,
    checkExportCommunity
} = require('../validators/utils')

module.exports = app => {
    const router = require('express').Router()
    const utilsController = require('../controllers/utils')

    router.get(
        '/exportMain', 
        checkExportMain,
        [utilsController.checkApiKey, utilsController.exportMain])

    router.get(
        '/exportCommunity',
        checkExportCommunity, 
        [utilsController.checkApiKey, utilsController.exportCommunity])

    app.use('/utils', router)
}