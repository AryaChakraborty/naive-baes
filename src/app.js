const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const { urlencoded } = require("express");
require("../src/db/connection");
require('dotenv').config();
app.use(express.json());
app.use(urlencoded({ extended: false }));

//* Home page 
app.get("/home",async(req,res)=>{
    // Home page will render here
})

//* Routes 

const loginRouter = require("../src/route/login_route");
app.use("/home",loginRouter);

const predictRouter = require("./route/predict_route");
app.use("/home",predictRouter);

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})