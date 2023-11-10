const cloudinary = require("cloudinary").v2;
require("dotenv").config()
const clodinaryConnection = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.API_key,
            api_secret: "-sMuG7MvZ5JZcKam43LVeZb0dSg"


        })
        console.log("connection succesfully cloudinary")
    } catch (error) {
        console.log("error while cloudinary coonection")
        console.log(error)

    }
}


module.exports = clodinaryConnection;