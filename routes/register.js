const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/user");
const {val_register} = require("./../validation/field_validate");
const bcrypt = require("bcryptjs");


//create users
router.post("/", val_register, async(req, res) => {
    const { name, email, password,phone, address, status  } = req.body;

    // //generate random userid
    // const userid =
    //     Math.random().toString(36).substring(2, 15) +
    //     Math.random().toString(36).substring(2, 15);

    //Hash password
    const hashed_password = await bcrypt.hash(password, 10);
    

    //Save user to database
    const save_user = new UsersSchema({
        name,
        email,
        password: hashed_password,
        image:"https://cdn-icons-png.flaticon.com/512/149/149071.png",
        phone,
        address,
        status:"offline",
    });
    try { 
        await save_user.save();
        res.status(200).json({
            message: "User created successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});

//get all users
router.get("/", async(req,res)=>{
    try {
        const userdata= await UsersSchema.find();
        res.status(200).json({message:"user details", data:userdata})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error:error.message})
    }
})

//update user
router.put("/:id", async(req,res)=>{
    try {
        const update_user= await UsersSchema.findByIdAndUpdate({_id:req.params.id},{
          name:req.body.name,
          email:req.body.email,
            phone:req.body.phone,
            address:req.body.address
        }) 
        res.status(200).json({message:"user updated successfully", data:update_user})
    } catch (error) {
        res.status(500).json({})
    }
})

//count total number of user
router.get("/total-user", async(req,res)=>{
    try {
        const total_user= await UsersSchema.countDocuments();
        res.status(200).json({message:"total users", data:total_user})
    } catch (error) {
        res.status(400).json({message:"something went wrong", error:error.message})
    }
})

//count total number of online-user
router.get("/online-user", async(req,res)=>{
    try {
        const total_user= await UsersSchema.countDocuments({status:"online"});
        res.status(200).json({message:"total users", data:total_user})
    } catch (error) {
        res.status(400).json({message:"something went wrong", error:error.message})
    }
})

module.exports = router;