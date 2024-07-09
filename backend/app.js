const express=require("express");
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");
const donationRoutes=require("./routes/donationRoutes");
// import records from "./routes/record.js";


const PORT = process.env.PORT ;
const app = express();

app.use(cors());
app.use(express.json());
app.get("/check",(req,res)=>{
    res.send("Hii.....")
})
app.use("/user", userRoutes);
app.use("/donation",donationRoutes);

module.exports = app;
