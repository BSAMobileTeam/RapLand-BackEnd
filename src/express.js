const express = require('express')


module.exports = () => {
    const app = express()
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    // Define routes
    require('./routes/question')(app)

    return app
}
