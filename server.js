const express = require("express");
const app = express()

require("dotenv").config()
const PORT = 6001;

app.use(express.json())
const fileuploader = require("express-fileupload")
app.use(fileuploader({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
const route = require("./Routes/AllRoutes")
app.use("/api/v6", route)

console.log("start")
const databaseconnect = require("./confiq/databse")
databaseconnect();
const clodinaryConnection = require("./confiq/cloudinary");
const { db } = require("./Model/user");
clodinaryConnection();
app.listen(PORT, (req, res) => {
    console.log(`Apppi Listening on POrt ${PORT}`)
})