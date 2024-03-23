const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    userType:{
        type:String,
        required:[true,"password is required"]
    }
})
userSchema.pre("save",async ()=>{
    this.password=await bcrypt.hash(this.password,12)
})
module.exports=mongoose.model("User",userSchema,"Login")