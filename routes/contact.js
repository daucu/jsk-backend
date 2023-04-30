const express = require("express");
const router = express.Router();
const contactSchema = require("./../models/contact");
const { val_contact } = require("./../validation/field_validate");


//create contact
router.post("/",val_contact, async (req, res) => {
    try {

        const { name,email,message } = req.body;
        const save_service = new contactSchema({
            name,
            email,
            message 
        });
        await save_service.save();
        res.status(200).json({message: "Thank you gor contacting us",data: save_service});
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//get contact
router.get("/", async (req, res) => {
    try {
        const contact = await contactSchema.find().sort({createdAt: -1});
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//get contact by id
router.get("/:id", async (req, res) => {
    try {
        const contact = await contactSchema.findById(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});
 
//delete contact
router.delete("/:id", async (req, res) => {
    try {
        const contact = await contactSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "contact deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

module.exports=router;