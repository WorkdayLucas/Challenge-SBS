import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    price:{
          type: Number,
          require: true,
    },
    img:{
        type: String,
        require: true,
    },
    key:{
        type: Number,
        require: true,
    }
})

export default model("Product", productSchema);