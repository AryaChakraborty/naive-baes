const express = require("express");
const Router = express.Router();
const user = require("../model/user");
Router.route("/login")
    .get(async (req, res) => {
        res.status(200).render("login.pug");
    })
    .post(async (req, res) => {
        try {

            const licenseID = req.body.licenseID;
            const password = req.body.password;

            const userData = await user.findOne({ licenseID });
            const passwordDB = userData?.password;

            if (userData == null) {
                res.status(401).json(
                    {
                        msg: "Invalid LicenseID"
                    }
                );
            }

            if ( password !== passwordDB){
                res.status(401).json(
                    {
                        msg: "Invalid Credentials"
                    }
                );
            }
            else {
                res.status(200).send("Welcome to dashboard");
            }
        }
        catch (err) {
            console.log(err);            
        }
    })



module.exports = Router;