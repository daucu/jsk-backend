const express = require("express")
const router = express.Router();
const UsersSchema = require("./../models/user")
const jwt = require("jsonwebtoken");
require("dotenv").config();



router.post("/logout", async (req, res) => {
  try {
    //Check user have token or not
    // console.log(req.cookies)
    // console.log(req.body.headers.token)
    // console.log(req.query)
    // console.log(req.headers.token)
    const token = req.cookies || req.body.token || req.headers.authorization || req.headers.token || req.body.headers.token;
    // console.log(token)

    if (token == undefined || token == null || token == "") {
      return res.json({ message: "User is not login" });
    }

    const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    // console.log(have_valid_tokem)

    if (!have_valid_tokem) {
      return res.json({ message: "something goes wrong" });
    }

    const id_from_token = have_valid_tokem._id;
    if (id_from_token) {
      const offline_status = await UsersSchema.findByIdAndUpdate({ _id: id_from_token }, {
        status: "offline"
      })
    }

    res.clearCookie("token");
    // localStorage.removeItem('token')
    res.json({ message: "Logout Success!", status: "success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" })
  }

});


module.exports = router;