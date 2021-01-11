const express = require('express')


module.exports = () => {
    const app = express()

    app.use(express.json())
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    // Define routes
    require('./routes/question')(app)

    return app
}
