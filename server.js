const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./server/database/connection')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const initialize = require('./server/services/passport')
const methodOverride = require('method-override')
const app = express()


// load config path
dotenv.config({path: './config/config.env'})
const PORT = process.env.PORT||8080


// initialize passport
initialize(passport)


// connect database
connectDb()

// log morgan requests
app.use(morgan('tiny'))
// bring in method Override
app.use(methodOverride('_method'))

// set template emgine
app.set('view engine', 'ejs')

// load body parser
app.use(express.urlencoded({extended: false}))

// express session
app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect flash 
app.use(flash())

// set global variables for flash messages
app.use((req, res, next)=>{
 res.locals.success_msg = req.flash('success_msg')
 res.locals.error_msg = req.flash('error_msg')
 res.locals.error = req.flash('error')
 next()
})


// load public assets
app.use('/css', express.static(path.resolve(__dirname, 'public/css')))
app.use('/js', express.static(path.resolve(__dirname, 'public/js')))
app.use('/img', express.static(path.resolve(__dirname, 'public/img')))

app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/auth'))
app.use('/posts', require('./server/routes/posts'))
app.use('/user', require('./server/routes/users'))



app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})