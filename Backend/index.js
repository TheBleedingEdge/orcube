const Express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/usersRoutes")
const adminRoutes = require("./routes/adminRoutes")
const hostRoutes = require("./routes/hostRoutes")
const stripe = require("./routes/stripe")


// const User = require('./models/userModel')


const app = Express();
dotenv.config({ path: "./config/.env" })



// app.use(cors({
//     credentials: true,
//     origin: 'http://127.0.0.1/5000'
// }));
app.use(cors())
app.use(Express.json());

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the MONGO ATLAS")
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected!");
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected!");
})


app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/host", hostRoutes)
app.use("/api/stripe", stripe)



app.listen(5000, () => {
    connect();

})