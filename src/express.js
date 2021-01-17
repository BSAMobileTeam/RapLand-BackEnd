const express = require('express')


module.exports = () => {
    const app = express()

    app.use(express.json())
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    // Define routes
    require('./routes/question.main')(app)
    require('./routes/question.community')(app)
	require('./routes/user.dev')(app)
	require('./routes/user')(app)

    return app
}
