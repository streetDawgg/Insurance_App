import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs";

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
// register
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
// login
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

        const passwordMatch = await bcrypt.compare( 
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
    },// test this moron, then delete this comment -me
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
router.delete(`/delete/:username`, async (req, res) => {
    const { username } = req.params

    const users = await User.findOneAndUpdate ({
            username: new RegExp(`^${username}$`,"i"),
            deleted: false
    },
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
router.patch(`restore/:username`, async (req, res) =>{
    const { username, email, password} = req.params;

       const users = await User.findOneAndUpdate({
            username: new RegExp(`^${username}$`,"i"),
            email: new RegExp(`^${email}$`,"i"),
            password: new RegExp(`^${password}$`,"i")
    },
    {
        deleted:false,
        deleteadAt: null,
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