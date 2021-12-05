module.exports = {
   
    mustBeLoggedin: (req, res, next)=>{
         
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'You must be logged in to View this resource')
        res.redirect('/user/login')
    },

    isAlreadyLoggedIn: (req, res, next)=>{

        if(!req.isAuthenticated()){
           return next()
        }
        res.redirect('/dashboard')
    }


}