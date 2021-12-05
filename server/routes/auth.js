const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isAlreadyLoggedIn} = require('../services/authorize')

// register Url
router.get('/register', isAlreadyLoggedIn, (req, res)=>{
    res.render('register')
})

// login url

router.get('/login', isAlreadyLoggedIn, (req, res)=>{
    res.render('login')
})



// register Handler
router.post('/register', async (req, res)=>{
  const {username, email, password, password2} = req.body
    //   form validations
      let errors = [];
    //   check for empty fields
     if(!username || !email || !password || !password2){
          errors.push({message: 'Please Fill all empty fields'})
     }
     
    //  check for password match
       if(password != password2){
          errors.push({message: 'Passwords do not Match'})
       }

    //    check for password lenght

      if(password.length < 6){
        errors.push({message: 'Password must be at least 6 characters'})
      }
    //   check for password strength
      const strongChar = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if(!password.match(strongChar)){
        errors.push({message: 'Password must contain at least One uppercase, a number and a Special character'})
      }

    //   check if user passes all validations
      if(errors.length > 0){
         res.render('register', {errors, username, email})
      }else{
        
       try {
           // //   check if user is already registered
         const userExists = await User.findOne({email: email})

         if(userExists){
            let errors = []
            errors.push({message: 'This email is already registered'})
            res.render('register', {errors, username, email})
         }else{

             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(password, salt)


            const newUser = new User(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                }
               ) 
                const savedNewuser =  newUser.save()
                req.flash('success_msg', 'Your registration was successful, Please Login')
                res.redirect('/user/login')

                }
           
       } catch (error) {
            console.log(error)
       }
        

      }
        

})



// login Handler

router.post('/login', (req, res, next)=>{
   passport.authenticate('local', {
     successRedirect: '/dashboard',
     failureRedirect: '/login',
     failureFlash: true
   })(req, res, next);
  
})


// logout Handler

router.get('/logout', (req, res)=>{
  req.logOut();
  req.flash('success_msg', "You're now logged out")
  res.redirect('/login')
})



module.exports = router