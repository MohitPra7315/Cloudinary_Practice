const nodemailer = require("nodemailer")

exports.tranporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: "mohitprajapati7315@gmail.com",
        pass: "psazblidwzoykyug"
    }
})