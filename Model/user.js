const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    tags: {
        type: String

    },
    imageUrl: {
        type: String

    },  email: {
        type: String,
        required: true

    }

})
userSchema.post("save", async (doc) => {
   
    try {
        
        const tranporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "mohitprajapati7315@gmail.com",
                pass: "psazblidwzoykyug"
            }
        })

        const response = await tranporter.sendMail({
            from: "BetaPhore private Limited",
            to: doc.email,
            subject: "New file saved in data base",
        

                html: `<span>see from here :- <p>${doc.imageUrl}</p/></span>`
         
        })
    } catch (error) {

    }
})


module.exports = mongoose.model("user", userSchema)