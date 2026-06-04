import express from "express";
import Car from "../models/Car";

import path from "path"
import fs from "fs";


console.log("SERVER FILE LOADED");
const router = express.Router();

const filePath = path.resolve("src/data/AutoDB.json")
const autoDB = JSON.parse(fs.readFileSync(filePath, "utf8"));

router.get("/",(req,res) =>{
    console.log("Cars Route Hit")
    res.json({autoDB});
});


// to get Make of Vehicle from DB
router.get("/:make", (req, res) => {
    //res.send(`You requested ${req.params.make}`);
    console.log("Make Route hit");
    const {make} = req.params;
    const car = autoDB.find(c => c.make.toLowerCase() === make.toLowerCase());

if(!car){
    return res.status(404).json({
        message: "Make not Found"
    })
}
res.json(car);
});

// get Model of Vehicle
router.get("/:make/:model", (req, res) => {
    console.log("Model Route Hit")

    const {make, model} = req.params;
    const brand = autoDB.find(
        c => c.make.toLowerCase() === make.toLowerCase()
        
    );

    if(!brand){
        return res.status(404).json({
            message:"Brand not found"
        });
    }

    const foundModel = brand.models.find(
         c => c.model.toLowerCase() === model.toLowerCase()
    );
    if(!foundModel){
        return res.status(404).json({
            message:"Model not found" 
        });
    }
    res.json(foundModel);
});

router.get("/filter/type/:type", (req,res) =>{
    console.log("type Route Hit")

    const { type } = req.params;

    const results = [];
    
    autoDB.forEach(make => {
        make.models.forEach(model =>{

         if (model.type.toLowerCase() === type.toLowerCase()){
            results.push({
                make: make.make,
                ...model
            })
        }      
        })
    });
    res.json(results);
})

export default router;