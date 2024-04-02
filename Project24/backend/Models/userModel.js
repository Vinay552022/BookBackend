const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"email is required"]
    },
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
    },
    usersAdded:{
        type:Array,
        default:[]
    },
    adminsAdded:{
        type:Array,
        default:[]
    }
})
userSchema.pre("save", async function(next) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
      next();
    } catch (error) {
      next(error);
    }
  });
  
module.exports=mongoose.model("User",userSchema,"Login")