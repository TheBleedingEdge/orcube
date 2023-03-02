import  Express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app = Express()
dotenv.config({path: "./config/.env"})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the MONGO ATLAS")
      } catch (error) {
        throw error
      }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB Disconnected!");
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB Connected!");
})

app.get("/", (req,res)=>{
    res.json("HEllo")
})

app.listen(5888, ()=>{
    connect();

})