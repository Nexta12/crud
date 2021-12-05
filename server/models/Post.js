const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
        
    },
    username:{
        type:String,
        required: true
    },
    Img:{
        type:String,
        default: ""
        
    },
    categories:{
         type: Array
    },

    deescription:{
        type:String
    }
},{timestamps: true})


module.exports = mongoose.model('Post', postSchema)