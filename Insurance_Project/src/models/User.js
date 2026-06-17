import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,

    deleted: {
    type: Boolean,
    default: false,
    },

    deletedAt: {
    type: Date,
    default: null,
    }
});

const User = mongoose.model("User", userSchema);
export default User;