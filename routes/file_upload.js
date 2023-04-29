const express = require("express")
const router = express.Router();
const image_upload = require('../models/user');
require("dotenv").config();
const jwt = require("jsonwebtoken")
const path = require('path');

router.put('/:id', async (req, res) => {
    // // console.log(req.body.headers["token"]) //we are getting token from here
    // const token = req.cookies.auth_token || req.body.token ||req.headers["token"] ||req.body.headers["token"];
    // // console.log(token)
    // if (!token) {
    //     return res.status(401).json({ message: "Access denied. Please register first", status: "error" });
    // }
    // const valid_token = jwt.verify(token, process.env.JWT_SECRET, {
    //     expiresIn: "1y",
    //     algorithm: "HS256"
    // });
    // if (!valid_token) return res.status(401).json({ message: "Invalid token" });
    // const id_from_token = valid_token._id;
    // // console.log(id_from_token)


    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let image = req.files.image;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv('./uploads/' + image.name);

            //send response
            // res.send({
            //   avatar: req.protocol+"://"+req.get("host")+"/"+avatar.name,
            //     status: true,
            //     message: 'File is uploaded',
            // });

            //update to database
            const update_image = await image_upload.findByIdAndUpdate({ _id: req.params.id }, {
                image: req.protocol + "://" + req.get("host") + "/" + image.name,

            })

            // //save to database
            // const save_image = new image_upload({
            //     image: req.protocol+"://"+req.get("host")+"/"+image.name,
            // });
            // await save_image.save();
            res.send({ status: true, message: 'File is uploaded' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//get all files 
router.get('/', async (req, res) => {
    try {
        // const user = req.user;
        // const user_id= user._id;
        const image = await image_upload.find();
        // console.log(image)
        res.send(image);
    } catch (err) {
        res
            .status(500)
            .send(err);
    }
});

//get files by id
router.get("/:id",async(req,res)=>{
    try {
        const image= await image_upload.findById({_id:req.params.id});
        res.status(200).json({message:"get file", data:image})
    } catch (error) {
        res.status(400).json({message:"something went wrong", error:error.message})
    }
})

//Static file
router.use("/", express.static("files"));

//Get File directly
router.get("/dir", (req, res) => {
    res.json({ files_Path: "http://localhost" + "/" });
});


module.exports = router;