import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) =>{

    if(!req.user){
        return res.status(401).json({message:"Authentication required"})
    }

    if(req.user.role === "admin"){
        return next();
    }
    else{
        return res.status(403).json({
        message:"Admin access required!"
    });
    }
}// add this to delete route mofo!SSSS


export default authAdmin;