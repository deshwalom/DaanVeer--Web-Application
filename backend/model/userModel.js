const mongoose=require("mongoose");
const validator = require('validator')
// express-validator
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Username is required"],
      maxLength:[30,"Username is too long"],
      minLength:[2,"Username is too short"]

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    gender:{
      type:String,
      required:[true,"Specify your gender"]
    },
    age:{
     type:String,
     required:[true,"Specify your age"]
    },
    mobile:{
     type:Number,
     maxLength:[10,"Enter a valid Phone Number"],
     minLength:[10,"Enter a valid Phone Number"],
     required:[true,"Enter your Phone number"]
    },
    address:{
      type:String,
      required:[true,"Enter your current Address"]
    },
    district:{
      type:String,
      required:[true,"Enter your district"]
    },
    isVolunteer:{
      type:Boolean,
      default:false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    pendingRequests: Number,
    completedRequests: Number

});

userSchema.pre("save",async function(next){

  if(!this.isModified("password")){
    next();
  }
  this.password=await bcrypt.hash(this.password,10);
})

// JWT token
userSchema.methods.getJWTToken= function(){
  console.log("Token created for id: "+this._id);
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  })
}

// Compare password
userSchema.methods.comparePassword= async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

// Generating password reset token
userSchema.methods.getResetPasswordToken=function(){
  // generating token
  const resetToken=crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log("Your updated token is: "+resetToken)
  return resetToken;
}

module.exports=mongoose.model("User",userSchema);