const express = require('express')
require('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')

const ac = require('./controllers/authController')

const PORT = 4000

const { SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
    })
)

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)

app.listen( PORT, () => {
    console.log(`listening on port ${PORT}`)
})

