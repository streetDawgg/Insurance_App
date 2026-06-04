import express from "express"
import Car from "../models/Car.js";

const router = express.Router();

//Pagination
router.get("/", async (req, res) =>{
    try{
        let { page = 1, limit = 10} = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page -1) * limit;

        const cars = await Car.find()
        .skip(skip)
        .limit(limit);

        const total = await Car.countDocuments();

        res.json({
                totalRecords: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: cars
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }

});

//filkter type
router.get("/filter/type/:type", async (req, res) => {
    const { type } = req.params;

    const vehicle = await Car.find({
        type: new RegExp(`^${type}$`, "i"),
    });
    
        if (vehicle.length === 0){
        return res.status(404).json({message:"Type not found"})
        }
    res.json(vehicle);
});

//filter engine
router.get("/filter/engine/:engine", async (req, res) =>{
    const { engine } = req.params;

    const vehicle = await Car.find({
        engine: new RegExp(`^${engine}$`,"i")
    });

    if (vehicle.length === 0){
        return res.status(404).json({message:"Engine not found"})
    }
    res.json(vehicle);
});

//filter year
router.get("/filter/year/:year", async (req, res) =>{
    const { year } = req.params;

    const vehicle = await Car.find({
        year: year
    });

    if (vehicle.length === 0){
        return res.status(404).json({message:"year not found"})
    }

    res.json(vehicle);
});
////==============================================================================================================================
// Delete vehicle
router.delete("/:make/:model", async (req, res) =>{
    const {make, model} = req.params
    
    const vehicle = await Car.findOneAndDelete({   
        make: new RegExp(`^${make}$`, "i"), 
        model: new RegExp(`^${model}$`, "i"),
    })

    if(!vehicle){
       return res.status(404).json({message:"Cannot find Model"})
    }
    res.json({
        message:"Vehicle deleted successfully!",
        deletedVehicle:vehicle
    });
});
//

// dynamic ROUTES
//get car
router.post("/", async (req, res) =>{
    try{
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

// get make
router.get("/:make", async (req,res) =>{
 const car = await Car.find({ make: new RegExp(`^${req.params.make}$`, "i") });;

    if(!car){
        return res.status(404).json({message:"Make not found"})
    }
    res.json(car)
});


//get model
router.get("/:make/:model", async (req,res) =>{
    const { make, model } = req.params;

    const vehicle = await Car.findOne({
        make: new RegExp(`^${make}$`, "i"), 
        model: new RegExp(`^${model}$`, "i")});

      if(!vehicle){
        return res.status(404).json({message:"Make not found"})
    }
    res.json(vehicle);
});


export default router;