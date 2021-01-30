const { query } = require('express-validator');

const checkExportMain = [
    query('apiKey').isString().notEmpty(),
    query('withId').isBoolean().optional()
]

const checkExportCommunity = [
    query('apiKey').isString().notEmpty(),
    query('withId').isBoolean().optional()
]

module.exports = {
    checkExportMain,
    checkExportCommunity
}