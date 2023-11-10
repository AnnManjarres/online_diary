require('dotenv').config()
let express = require('express')
let app =  express()
let morgan = require('morgan')
let session = require('express-session')
let Sqlite = require('connect-sqlite3')(session)
let passport = require('passport')
let authRoutes = require('./controller/auth')
let entriesRoutes = require('./controller/entries')
let baseRoutes = require('./controller/base')
let ejs = require('ejs')

let port = process.env.PORT

app.use(morgan('tiny'))
app.use(express.json())

//Session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new Sqlite({db: 'sessions.db', dir: './sqlite/'})
}))

app.use(passport.authenticate('session'))

app.set('view engine', 'ejs')
app.use(express.static('static'))

//routes auth
app.use('/', baseRoutes)
app.use('/auth', authRoutes)
app.use('/entries', entriesRoutes)


app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`)
})