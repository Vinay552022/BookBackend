const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
require("dotenv").config()
const mongoose=require("mongoose")
const {MONGO_URL,PORT}=process.env
let {Login,userVerification}=require("./Controllers/AuthController.js")
let {userRegistration}=require('./Controllers/Registration.js')
let {getUserDataByType}=require('./Controllers/userController.js')
let {registerAdmin}=require('./Controllers/AdminRegister.js')
let {userRegistrationByAdmin}=require('./Controllers/Registration.js')
let {getAdminRegisteredUsers}=require('./Controllers/AdminController.js')
let {getBooks}=require('./Controllers/AdminController.js')

let {addCartController}=require('./Controllers/addCartController.js')
let {deleteCartController}=require('./Controllers/deleteCartController.js');
const { getCartController } = require('./Controllers/getCartController.js');
const { placeOrderController } = require('./Controllers/placeOrderController.js')
//mongo connection
mongoose.connect(MONGO_URL,{dbName:'Admins'})
.then(()=>console.log("db connection successfull"))
.catch((err)=>console.log(err.message))

app.use(
  cors({
  origin:["https://www.haelanhomeopathy.com"],
  method:["get","post","delete"],
  credentials:true
}
))
app.use(cookieParser())
app.use(express.json())

//server
app.listen(PORT,()=>{
  console.log("server started at port 4000")
});
app.post("/login",Login)
app.post("/",userVerification)
app.post("/registerUser",userRegistration)
app.get('/user-data', getUserDataByType);
app.post('/registerAdmin',registerAdmin)
app.post('/userRegistrationByAdmin',userRegistrationByAdmin)
app.post('/getAdminRegisteredUsers',getAdminRegisteredUsers)

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/getBooks",getBooks)


app.post('/placeOrder',placeOrderController)
app.get(`/getCart/:email/:userType`,getCartController); 
app.put(`/add_to_cart/:bookId`,addCartController)
app.delete(`/delete_cart/:email/:userType/:bookId`,deleteCartController)

