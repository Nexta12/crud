const router = require('express').Router()
const { mustBeLoggedin} = require('../services/authorize')
const Post = require('../models/Post')


router.get('/new-post',  mustBeLoggedin, (req, res)=>{
  res.render('new-post')
})


// Post handling

router.post('/new-post', (req, res)=>{
  
    
})


module.exports = router