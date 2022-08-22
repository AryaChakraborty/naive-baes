const express = require("express");
const Router = express.Router();
const userModel = require("../model/user.model");

Router.route("/profile")
    .get(async (req, res) => {
        try {

            const licenseID = "Ajhdfui876hjkbj3249h87"; //TODO From cookies 

            const user = await userModel.findOne({ licenseID });

            const fullName = user?.fullName;
            const email = user?.email;
            const phoneNumber = user?.phoneNumber;
            const position = user?.position;
            const image = user?.image;

            const param = {
                "fullName": fullName,
                "licenseID": licenseID,
                "email":email,
                "phoneNumber": phoneNumber,
                "position": position,
                "image": image,
            };
            res.status(200).render("profile.ejs", param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;