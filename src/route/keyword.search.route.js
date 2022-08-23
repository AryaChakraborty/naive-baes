const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");

Router.route("/keywordSearch")
    .get(async (req, res) => {
        res.status(200).render("keywordsearch.ejs");
    })


module.exports = Router;