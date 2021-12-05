const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')




const initialize = function initialize(passport){

 passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done)=>{
    
    // let's check if user actually exits in database by matching the email

    try {
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false, {message: 'This email is not registered'})
        }else{
            // check password correctness
            const correctPassword = await bcrypt.compare(password, user.password)
            if(!correctPassword){
              return done(null, false, {message: 'Password is Incorrect'})
            }else{
                return done(null, user)
            }
        }


    } catch (error) {
        console.log(error)
    }
 }))

 passport.serializeUser((user, done)=>{
     done(null, user.id)
     
 })

 passport.deserializeUser((id, done)=>{
   User.findById(id, (err, user)=>{
     done(err, user)
   })
 })

}





module.exports = initialize