const express = require('express')
const {
    VERSION="1.0.1",
} = process.env

module.exports = () => {
    const app = express()

    app.use(express.json())
    
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
