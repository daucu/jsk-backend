const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/user");
// const {  val_login } = require("./../validation/field_validate");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const bcrypt = require("bcryptjs");

//Check User is login or not
router.put("/", async (req, res) => {
    try {
        //Check user have token or not
        // console.log(req.cookies)
        // console.log(req.body.headers.token)
        // console.log(req.query)
        // console.log(req.headers)
        const token = req.cookies || req.body.token || req.headers.authorization || req.headers.token || req.body.headers.token;
        // console.log(token)

        if (token == undefined || token == null || token == "") {
            return res.json({message:"User is not login"});
        }

        const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET, {
            algorithm: "HS256",
        });
        // console.log(have_valid_tokem)

        if (!have_valid_tokem) {
            return res.json({message:"something goes wrong"});
        }

        const id_from_token = have_valid_tokem._id;
        // console.log(id_from_token)

        //Check Same id have database
        // const user = await UsersSchema.findOne({ _id: id_from_token }).lean();
        // console.log(user);

        // if (user == undefined || user == null || user == "") {
        //     res.json(false);
        // } else {
        //     res.json(true);
        // }
        // console.log(id_from_token)
        //if login is true update status to online
        if (id_from_token == undefined || id_from_token == null || id_from_token == "") {
            const online_status = await UsersSchema.findByIdAndUpdate({ _id: id_from_token }, {
                status: "offline"

            })
            res.status(200).json({ message: "user is offline", data: online_status })
        }
        else {
            const offline_status = await UsersSchema.findByIdAndUpdate({ _id: id_from_token }, {
                status: "online"
            })
            res.status(200).json({ message: "user is online", data: offline_status })
        }
    

        
    } catch (error) {
res.status(500).json({message:"something went wrong", error:error.message})
}
});


module.exports = router;