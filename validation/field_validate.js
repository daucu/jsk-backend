const userSchema= require('../models/user');
const serviceSchema= require('../models/service');
const contactSchema= require('../models/contact');

exports.val_register= async (req, res,next) => {

const user= await userSchema.findOne({email: req.body.email});

if(user) return res.status(400).json({message: "User already exists", status: "error"});
    const {name, email, password} = req.body;

    try { 
        if(!name || !email || !password){
            return res.status(400).json({message: "Please enter all fields", status: "error"});
        }
       
        next();
       
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }

}

exports.val_login= async (req, res,next) => {
    const { email, password} = req.body;

    try { 
        if( !email || !password){
            return res.status(400).json({message: "Please enter all fields", status: "error"});
        }
       
        next();
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
    
}

exports.val_service= async (req, res,next) => {
    const service=await serviceSchema.findOne({serv_name: req.body.serv_name});
    if(service) return res.status(400).json({message: "Service already exists", status: "error"});
    try {
        const {serv_name, ur_name, description, serv_number, image} = req.body;
        if(!serv_name || !ur_name || !description || !serv_number || !image){
            return res.status(400).json({message: "Please enter all fields", status: "error"});
        }
        next()
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
}

exports.val_contact = async (req, res,next) => {
    try {
        const {name, email, message} = req.body;
        if(!name || !email || !message){
            return res.status(400).json({message: "Please enter all fields", status: "error"});
        }
        next()
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
}
