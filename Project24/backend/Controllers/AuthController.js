const User = require("../Models/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification =async (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.email })
      else return res.json({ status: false })
    }
  })
}

module.exports.Login = async (req, res, next) => {
    try {
        console.log(req.body)
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      console.log(user)
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
     console.log(auth)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       
       const expiryDate = new Date();
       expiryDate.setDate(expiryDate.getDate() + 7);

       res.cookie("token", token, { expires: expiryDate });
       res.status(201).json({ message: "User logged in successfully", success: true });
    
    } catch (error) {
      console.error(error);
    }
  }