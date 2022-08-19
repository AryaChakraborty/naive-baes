const express = require("express");
const Router = express.Router();

Router.route("/submit")
    .get(async(req,res)=>{
        // res.json(
        //     {
        //         msg: "Dashboard route working"
        //     }
        // )
        res.render("submit.ejs");
    })



module.exports = Router;