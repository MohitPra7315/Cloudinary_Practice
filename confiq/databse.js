const mongoose = require("mongoose")
require("dotenv").config();
const databaseconnect = async () => {
    mongoose.connect(process.env.MOGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("succesfully databse connection ")
        })
        .catch((error) => {
            console.log("error is occured error while Db connection")
            console.error(error)
        process.exit(1)
        })
}

module.exports=databaseconnect;
