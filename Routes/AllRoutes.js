const express=require("express");
const route=express.Router();


const {LocalFileUpload,imageUpload,videoUpload,imageReduceUploal}=require("../Controllers/FileUpload")

route.post("/localFile",LocalFileUpload)
route.post("/imageUpload",imageUpload)
route.post("/videoUpload",videoUpload)
route.post("/imageSizeReducer",imageReduceUploal)


module.exports=route;