const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')
const { deleteMany } = require('../models/User')


// get user
router.get('/:id', async (req, res)=>{

 try {
     
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc
    res.render('user-profile', {user: user})

 } catch (error) {
     console.log(error)
 }

})


// update a user
 router.put("/:id", async (req, res)=>{

    if(req.body.userId === req.params.id){

        if(req.body.password){
           const salt = await bcrypt.genSalt(10)
           req.body.password = await bcrypt.hash(req.body.password, salt)
         }

     try {
         
         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
             $set: req.body
         }, {new: true})
          res.redirect('/user-profile', {user: updatedUser})
     } catch (error) {
         console.log(error)
     }

    }else{

        res.send("You can only update your account")

    }
     
 })


//  delete User 
router.delete("/:id", async (req, res)=>{

    if(req.body.userId === req.params.id){

        try {
            // find user posts and delete
            const user = await User.findById(req.params.id)
            try {
           await Post.deleteMany({username: user.username})
         await User.findOneAndDelete(req.params.id)
          res.render('dashboard')
     } catch (error) {
         console.log(error)
     }
        } catch (error) {
             console.log(error) //User not found (404)
        }
    }else{

        res.send("You can only delete your account")

    }
     
 })





module.exports = router