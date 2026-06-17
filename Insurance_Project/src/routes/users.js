import express from "express"
import User from "../models/User.js"
import bcryptsjs from "bcryptjs"
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async(req, res)=>{
    try{
        const { username, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message:"User created successfully"
        });
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

router.post("/login", async(req, res) =>{
        const { username, email, password } = req.body; 

        const user = await User.findOne({
            email: email,
        });
        
        if (!user){
            return res.status(404),json({
                message:"User not found"
            })
        };

        const passwordMatch = await bcryptsjs.compare( 
            password,
            user.password,
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid password"
            })
        };
        res.json({
            message:"Login successfully!"
        });
});

export default router;