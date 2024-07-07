const mongoose=require("mongoose");

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(data.connection.host);
        console.log("Database Connected Successfully!!!!!");
    })
    
}
module.exports=connectDatabase;