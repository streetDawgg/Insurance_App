import  express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

import carRoutes from "./routes/cars.js";
import usersRoutes from  "./routes/users.js"

dotenv.config();
//console.log(process.env.MONGO_URI);

const app = express();
app.use(express.json());

connectDB();

app.use("/cars", carRoutes);
app.use("/users", usersRoutes);

app.get("/",(req, res) => {
    res.send("API is RUNNING")
})

const PORT = process.env.PORT || 5555; //

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});


/*app.get("/test",(req,res) =>{
    res.send("TEST WOKRS");
}); for Testing*/ 