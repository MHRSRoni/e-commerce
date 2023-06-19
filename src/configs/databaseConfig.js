//dependencies for setting up database
const mongoose = require("mongoose")

const connectDatabase = () =>{
    const db =mongoose.connect(process.env.DATABASE_URI,{family : 4, serverSelectionTimeoutMS : 5000}) //CONNECTION
                        .then(()=>console.log("database connected"))    //ON SUCCESS
                        .catch(err => console.log("database connection failed : check DATABASE_URI"))   //ON FAILED
}

//exporting database connection
module.exports = connectDatabase