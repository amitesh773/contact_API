const express = require('express');
const app = express();
require('dotenv').config();
const joi = require('joi');
const databaseconnection = require('./config/db')
const user = require('./models/user');
const { constants } = require('buffer');
const { json } = require('stream/consumers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use('/hi',(req, res, next)=>{
    console.log("I am running...")
    next();
})
*/

/*
const loginChecker = (req, res, next) => {
    if(req.body.num>10){
        return res.status(400).json({message: 'Bhai login nhi hai tumhara'})
    }
    console.log("Bhai login check kr rha hoon...")
    next();
}
*/

const checkLogin = require('./middleware/loginchecker')
databaseconnection().then(() => { console.log("Database connected....") })

//-------------------------------JOI VALIDATION-----------------------------------------
const userValiddation = require('./validators/userValidation');
const { default: mongoose } = require('mongoose');


//----------------------------------ROUTER CONNECTION---------------------------------
const contactRoute = require('./routes/contactRoutes')
app.use("/api/contact",contactRoute)

//----------------------------------SERVER CONNECTION----------------------------------
app.listen(process.env.PORT, () => {
    console.log("Server runing......")
})