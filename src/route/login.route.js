const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");

Router.route("/login")
    .get(async (req, res) => {
        res.status(200).render("login.ejs",
        {
            errorMsg: req.flash("login-err")
        });
    })
    .post(async (req, res) => {
        try {

            const licenseID = req.body.licenseID;
            const password = req.body.password;

            const userData = await user.findOne({ licenseID });
            const passwordDB = userData?.password;

            if (userData == null) {
                // res.status(401).json(
                //     {
                //         msg: "Invalid LicenseID"
                //     }
                // );
                req.flash("login-err", "LicenseID is not registered in our system");
                res.status(401).redirect("/login");
            }

            if ( password !== passwordDB){
                // res.status(401).json(
                //     {
                //         msg: "Invalid Credentials"
                //     }
                // );
                req.flash("login-err", "Invalid Credentials");
                res.status(401).redirect("/login");

            }
            else {
                res.status(200).redirect("/user/dashboard");
            }
        }
        catch (err) {
            console.log(err);            
        }
    })



module.exports = Router;