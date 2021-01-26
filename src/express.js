const express = require('express')
const {
    VERSION="1.0.1",
    LOG_LEVEL
} = process.env
const log4js = require('log4js')

module.exports = () => {
    const app = express()

    app.use(express.json())

    app.use(log4js.connectLogger(log4js.getLogger('express'), {level: LOG_LEVEL}))
    
    app.get('/', (req, res) => {
        try {
            return res.status(200).send(`Service is up. Version : ${VERSION}`)
        } catch (error) {
            return res.sendStatus(500)
        }
    })

    // Define routes
    require('./routes/question.main')(app)
    require('./routes/question.community')(app)
	require('./routes/user')(app)

    return app
}
