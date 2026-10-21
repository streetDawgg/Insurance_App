import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,

    deleted: {
    type: Boolean,
    default: false,
    },

    deletedAt: {
    type: Date,
    default: null,
    }
});

/*const userAdmin = new mongoose.Schema({
    ...userSchema,
    role: String,
});*/

const User = mongoose.model("User", userSchema);
//const Admin = mongoose.model("Admin",userAdmin);
export default User;