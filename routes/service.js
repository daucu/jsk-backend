const express = require("express");
const router = express.Router();
const ServiceSchema = require("./../models/service");
const { val_service } = require("./../validation/field_validate");


//create service
router.post("/",val_service, async (req, res) => {
    try {

        const { serv_name, ur_name, description, serv_number, image } = req.body;
        const save_service = new ServiceSchema({
            serv_name,
            ur_name,
            description,
            serv_number,
            image
        });
        await save_service.save();
        res.status(200).json({
            message: "Service created successfully",
        });

    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//get all services
router.get("/", async (req, res) => {
    try {
        const services = await ServiceSchema.find();
        res.status(200).json({
            message: "Services fetched successfully",
            services
        });
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//get single service
router.get("/:id", async (req, res) => {
    try {
        const service= await ServiceSchema.findById(req.params.id);
        res.status(200).json({
            message: "Service fetched successfully",
            service
        });
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//update service

router.put("/:id",val_service, async (req, res) => {
    try {
        const { serv_name, ur_name, description, serv_number, image } = req.body;
        const service = await ServiceSchema.findById(req.params.id);
        if (serv_name) {
            service.serv_name = serv_name;
        }
        if (ur_name) {
            service.ur_name = ur_name;
        }
        if (description) {
            service.description = description;
        }
        if (serv_number) {
            service.serv_number = serv_number;
        }
        if (image) {
            service.image = image;
        }
        await service.save();
        res.status(200).json({
            message: "Service updated successfully",
        });
    } catch (error) {
        res.status(400).json({ message: "something went wrong", error: error.message });
    }
});

//delete service
router.delete("/:id", async (req, res) => {
    try {
        const service = await ServiceSchema.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            message:"Service deleted successfully",
            service
        }) 
    }catch (error){
        res.status(500).json({message:"something went wrong", error:error.message})
    }
});



module.exports = router;