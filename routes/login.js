const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/user");
const {  val_login } = require("./../validation/field_validate");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
    });
});

//User Login
router.post("/",val_login, async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsersSchema.findOne({ email }).lean();
        if (!user)
            return res
                .status(400)
                .json({ message: "User and password is wrong.", status: "warning" });
        const hashpass = user.password;
        if (!bcrypt.compareSync(password, hashpass))
            return res
                .status(400)
                .json({ message: "User and password is wrong.", status: "warning" });

        //create and assign token
        const token = jwt.sign({
                _id: user._id,
              
            },
            process.env.JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: "12h",
            }
        );
        

        //Set cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 300,
            sameSite: "none",
            secure: true,
        }); //300 days

        res.setHeader("x-auth-token", token);
        res.cookie("auth_token", token)

        res.status(200).json({ message: "Login Successful", status: "success", token: token });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});

//Check User is login or not
router.get("/isLoggedIn", async (req, res) => {
    //Check user have token or not
    // console.log(req.cookies)
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.headers.token)
    const token = req.cookies || req.body.token || req.headers.authorization ||req.headers.token;
    // console.log(token)
  
    if (token == undefined || token == null || token == "") {
      return res.json(false);
    }
  
    const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    // console.log(have_valid_tokem)
  
    if (!have_valid_tokem) {
      return res.json(false);
    }
  
    const id_from_token = have_valid_tokem._id;
    // console.log(id_from_token)
  
    //Check Same id have database
    const user = await UsersSchema.findOne({ _id:id_from_token }).lean();
    // console.log(user);
  
    if (user == undefined || user == null || user == "") {
      res.json(false);
    } else {
      res.json({user:user});
    }
  }); //pending

module.exports = router;