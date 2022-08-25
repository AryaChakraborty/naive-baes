const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");

Router.route("/success")
    .get(async (req, res) => {
        res.status(200).render("success.ejs");
    })


module.exports = Router;