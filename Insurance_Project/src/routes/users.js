import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";


const router = express.Router();

//Pagination for admin, future things todo
router.get("/", async (req, res) =>{
    try{
        let { page = 1, limit = 10} = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page -1) * limit;

        const users = await User.find({
            deleted:false
        })
        .skip(skip)
        .limit(limit);

        const total = await User.countDocuments();

        res.json({
                totalRecords: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: users
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }

});
/* gett all
router.get("/all", async (req,res) => {
const users = await User.find();
res.json(users);
});*/


// register
router.post("/register", async(req, res)=>{
    try{
        const { username, email, password } = req.body;
        
        //validation
        if (!username.trim()){
            return res.status(400).json({message:"Username is required!"});
        }
        if (!email.trim()){
            return res.status(400).json({message:"Email is required!"});
        }
        if (!password.trim()){
            return res.status(400).json({message:"Password is required!"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)){
                return res.status(400).json({
                    message: "Invalid email adress."
                })
            } 

        //Email Dupe
        const extenguisher = await User.findOne({
    email
    })
    if(extenguisher){
        return res.status(409).json({
            message: "Email already exists"
        });
    }
        // Password 
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password.length < 8 ){
            return res.status(400).json({message:"Password must be at least 8 characters long"})
        }
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


// login
router.post("/login", async(req, res) =>{
        const { username, email, password } = req.body; 

        const user = await User.findOne({
            email: email,
        });
        
        if (!user){
            return res.status(404).json({
                message:"User not found"
            })
        };

        const passwordMatch = await bcrypt.compare( 
            password,
            user.password,
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid password"
            })
        };

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    );

        res.json({
            message:"Login successfully!",
            token,
            user:{
                id:user._id,
                username: user.username,
                email: user.email,
            }
        });
});

router.get("/profile", auth, async (req, res) =>{
    const user = await User.findById(req.user.id).select("-password");

    res.json(user)
});

//Update Password/change password
router.patch("/reset-password/:email", async (req, res)=>{
    const { email} = req.params;
    const {password} = req.body || {};

    if(!password){
        return res.status(400).json({
            message: "password is required"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

     const users = await User.findOneAndUpdate({
            email: new RegExp(`^${email}$`,"i"),
            deleted: false
    },// done testing - me
    {
        password: hashedPassword
    },
    {
        returnDocument:"after"
    }
    );

    if(!users){
        return res.status(404).json({
            message:"User not found"
        })
    };
            res.json({
            message:"Password updated successfully",
            updatedUsers: users
        })

});

// delete User
router.delete(`/delete/:id`, async (req, res) => {
    const { id } = req.params

    const users = await User.findByIdAndUpdate (
            id,
    {
        deleted:true,
        deletedAt: new Date(),
    },
    {
        returnDocument:"after"
    }
    );

    if(!users){
        return res.status(404).json({message:"User not found"})
    }
    res.json({
        message: "User successfully moved to evaluation",
        deletedUser:users
    });
});

// restore user
router.patch(`/restore/:id`, async (req, res) =>{
    const { id } = req.params;

       const users = await User.findByIdAndUpdate(
        id,
    {
        deleted: false,
        deletedAt: null,
    },
    {
        returnDocument:"after"
    }
    );

    if(!users){
        return res.status(404).json({message:"User not found"})
    }
    res.json({
        message: "User successfully restored",
        deletedUser:users
    });
});


export default router;