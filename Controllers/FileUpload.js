const user = require("../Model/user");
const { options, use } = require("../Routes/AllRoutes");
const cloudinary = require("cloudinary").v2

exports.Alldata = async (req, res) => {
    try {
        const response = await fileS.find({});
        res.status(200).json({
            success: true,
            post: response,
            message: "succesfully data  all fetched"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}

exports.LocalFileUpload = async (req, res) => {
    try {
        const file = req.files.imageFile
        const path = __dirname + '/files/photo/' + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("path", path)
        file.mv(path)

        res.json({
            success: true,
            message: "saved filr inside the local server"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while saving data insde the localderver",
            error: error.message
        })

    }
}

// it checks just file is includes Supported value
function isValidFile(file, Supported) {
    console.log("File for valid", file, "supported kk", Supported)
    return Supported.includes(file)
}

// it Upload the File on Cloudinary Storage by through the file Path 
async function UploaderforCloudinary(file, folder, quality) {
    const options = { folder }
    options.resource_type = "auto",
        // options.quality = quality
        options.eager = {
            eager: [
                { width: 20, height: 20, crop: 'thumb', gravity: 'face' },
                { width: 50, height: 50, crop: 'fit' }
            ],
            eager_async: true
        }
    if (file.mimetype.split("/")[0] == "image") {
        if (quality) {
            options.quality = quality
        }
    }
    const info = await cloudinary.uploader.upload(file.tempFilePath, options)
    console.log("response for clodinary uploaded file ", info)
    return info
}

exports.imageUpload = async (req, res) => {
    try {
        // first fetched the data from request body
        const { name, tags, email } = req.body;
        // second fetched the file from request body
        const { imageFile } = req.files;
        if (!imageFile) {
            res.json({
                success: false,
                message: "file is not sended by user"
            })
        }
        const Filetype = imageFile.name.split(".")[1].toLowerCase();
        const Supported = ["jpeg", "jpg", "png"]
        if (!isValidFile(Filetype, Supported)) {
            res.json({
                success: false,
                message: "Filetype is inValid"
            })
        }
        // Upload the Media file on the 
        const response = await UploaderforCloudinary(imageFile, "honorGallery")
        const savedData = await user.create({
            name,
            tags,
            email,
            imageUrl: response.url,
        })
        res.status(200).json({
            success: true,
            Data: savedData,
            message: "data has been succesfully saveed in Mongodb Databse"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}




exports.videoUpload = async (req, res) => {
    try {
        // first fetched the data from request body
        const { name, tags, email } = req.body;
        console.log("data from body", { name, tags, email });
        // second fetched the file from request body
        const { videoFile } = req.files;
        if (!videoFile) {
            res.json({
                success: false,
                message: "file is not sended by user"
            })
        }
        const Filetype = videoFile.name.split(".")[1].toLowerCase();
        console.log("type of file", Filetype)
        const Supported = ["mov", "mp4"]
        if (!isValidFile(Filetype, Supported)) {
            res.json({
                success: false,
                message: "Filetype is inValid"
            })
        }
        // Upload the Media file on the 
        const response = await UploaderforCloudinary(videoFile, "honorGallery")
        // save the daata insde the Db
        const savedData = await user.create({
            name,
            tags,
            email,
            imageUrl: response.url,
        })
        res.status(200).json({
            success: true,
            Data: savedData,
            message: "data has been succesfully saveed in Mongodb Databse"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}



exports.imageReduceUploal = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const imageFile = req.files.imageFile;
        if (!imageFile) {
            res.json({
                success: false,
                message: "file is not sended by user"
            })
        }
        const Filetype = imageFile.name.split(".")[1].toLowerCase();
        const Supported = ["jpeg", "jpg", "png"]
        if (!isValidFile(Filetype, Supported)) {
            res.json({
                success: false,
                message: "Filetype is inValid"
            })
        }
        // Upload the Media file on the 
        const response = await UploaderforCloudinary(imageFile, "honorGallery", 30)
        const savedData = await user.create({
            name,
            tags,
            email,
            imageUrl: response.url,

        })
        res.status(200).json({
            success: true,
            Data: savedData,
            message: "data has been succesfully saveed in Mongodb Databse"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}