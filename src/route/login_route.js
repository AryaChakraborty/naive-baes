const express = require("express");
const Router = express.Router();
const user = require("../model/user");

Router.route("/login")
    .get(async(req,res)=>{
        res.json(
            {
                msg: "Login route working"
            }
        )
    })
    .post(async (req, res) => {
        try {

            const licenseID = req.body.licenseID;
            const password = req.body.password;

            const userData = await user.findOne({ licenseID });

            if( userData == null){
                return res.json(
                    {
                        msg: "password is null"
                    }
                )                
            }
            const passwordDB = userData.password;

            if (password=== passwordDB) {
                res.json(
                    {
                        msg: "Password matched !. Redirect to dashboard"
                    }
                )
            }
            else {
                res.json(
                    {
                        msg: "Invalid Credentials !. Redirect to login page"
                    }
                )
            }
        }
        catch (err) {
            console.log(err);
            res.json(
                {
                    msg:err
                }
            )
        }
    })



module.exports = Router;