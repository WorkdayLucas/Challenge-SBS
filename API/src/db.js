import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


export async function Connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        })

        console.log("DB is connected")
    } catch (error) {
        console.log("Something fail")
    }
}