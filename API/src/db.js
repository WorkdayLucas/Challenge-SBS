import mongoose, { connect } from "mongoose";



export async function Connect() {
    try {
        mongoose.connect('mongodb://localhost/challenge-SBS', {
            useNewUrlParser: true
        })

        console.log("DB is connected")
    } catch (error) {
        console.log("Something fail")
    }
}