const router = require('express').Router()
const {mustBeLoggedin} = require('../services/authorize')


router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/dashboard', mustBeLoggedin, (req, res)=>{
    res.render('dashboard', {user: req.user.username})
})



module.exports = router