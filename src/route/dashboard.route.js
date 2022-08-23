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

    .post(async (req, res) => {
        try {

            const caseSearch = req.body.caseSearch;
            console.log(caseSearch)
            res.send(caseSearch);

        } catch (err) {
            console.log(err)
        }
    })


module.exports = Router;