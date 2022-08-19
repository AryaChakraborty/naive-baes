const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const { urlencoded } = require("express");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
require("../src/db/connection");
require('dotenv').config();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/static", express.static(static_path));


app.set("view engine", "ejs");
app.set("views", views_path);

//* Home page 
app.get("/",async(req,res)=>{
    res.status(200).render("index.ejs");
})

//* About page 
app.get("/about",async(req,res)=>{
    res.status(200).render("about.ejs");
})


//* Home Routes 

const loginRouter = require("./route/login.route");
app.use("/",loginRouter);

//* User Routes

const dashboardRouter = require("./route/dashboard.route");
app.use("/user",dashboardRouter);

const profileRouter = require("./route/profile.route");
app.use("/user",profileRouter);

const predictRouter = require("./route/predict.route");
app.use("/user",predictRouter);

const submitRouter = require("./route/submit.route");
app.use("/user",submitRouter);

//* Listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})