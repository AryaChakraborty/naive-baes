const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");
const axios = require("axios");

Router.route("/keywordSearch")
    .get(async (req, res) => {
        res.status(200).render("keywordsearch.ejs");
    })

    .post(async (req, res) => {
        let caseSearch = req.body.caseSearch;
        caseSearch = '{"key":'+caseSearch+'}'
        console.log(caseSearch);
        caseSearch = JSON.parse(caseSearch)['key'];
        let skeys= [];
        for (let i of caseSearch){
            skeys.push(i.value);
            // console.log(i)
        }
        console.log(skeys);

        let data = JSON.stringify({
            "search_key": skeys,
            "top": 1,
            "order_matters": false
        });

        let config = {
            method: 'post',
            url: 'http://35.90.190.108/search',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                res.send(JSON.stringify(response.data))
                // res.redirect("/success");
                // res.render("success.ejs");
            })
            .catch(function (error) {
                console.log(error);
            });
    })


module.exports = Router;