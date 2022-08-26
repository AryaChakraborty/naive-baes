const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");
const axios = require("axios");

Router.route("/keywordResult")
    .get(async (req, res) => {
        res.status(200).render("keywordResult.ejs"), {
            "docs": docs,
            "skeys" : skeys
        };
    })

module.exports = Router;