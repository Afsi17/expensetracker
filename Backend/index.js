const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require('./routes/expense');

dotenv.config() //load all .env files into process.env
const app=express();//app express created after loading the env variable


//MIDWARE ; a fnct that works btween client req and serv response
app.use(cors()); //allow FE req rn from any FE
app.use(express.json());  // ✅ This allows backend to parse JSON data

//ROUTES
app.use("/expenses",expenseRoute)

//DB CONNECTION 

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DataBase connection is successfull') //.then method is executed only when connection is succesfull
}).catch((err)=>{
    console.log(err)
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})