const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");
Router.route("/dashboard")
    .get(async (req, res) => {
        res.status(200).render("dashboard.ejs",
        {
            successMsg: req.flash("login-success")
        });
    })


module.exports = Router;