const mongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Server connected to Database`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDb