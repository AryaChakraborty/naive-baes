const express = require("express");
const Router = express.Router();
const user = require("../model/user");
Router.route("/dashboard")
    .get(async (req, res) => {
        res.status(200).render("dashboard.ejs");
    })


module.exports = Router;