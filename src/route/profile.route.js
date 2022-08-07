const express = require("express");
const Router = express.Router();
const user = require("../model/user");
Router.route("/profile")
    .get(async (req, res) => {
        res.status(200).render("profile.ejs");
    })


module.exports = Router;