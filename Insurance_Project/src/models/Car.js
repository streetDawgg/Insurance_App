import mongoose from "mongoose";


const modelSchema =  new mongoose.Schema({
    make: String,
    model: String,
    type: String,
    engine: String,
    //cylinder:Number,
    year: Number,

    deleted: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
        default: null,
    }
});


/*const carSchema = new mongoose.Schema({
    make: String,
    models: [modelSchema]
});*/  //if nested db for Make(to have just one make in a db)

const Car = mongoose.model("Car", modelSchema);

export default Car;

