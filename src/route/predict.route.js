const express = require("express");
const Router = express.Router();
const { storage , upload } = require("../multer/index");

Router.route("/predict")
    .get(async(req,res)=>{
        // res.json(
        //     {
        //         msg: "Dashboard route working"
        //     }
        // )
        res.render("predict.ejs");
    })
    .post(upload.single("image"),async (req, res) => {
        try {
            
    
        }
        catch (err) {
            console.log(err);
        }
    })



module.exports = Router;