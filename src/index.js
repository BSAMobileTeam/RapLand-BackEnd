const express = require('./express')
const { checkEnvVariables } = require('./config')
const logger = require('./logger')

checkEnvVariables()

const app = express()

app.listen(8080, () => {    
    logger.info('Server listening on 8080')
})
