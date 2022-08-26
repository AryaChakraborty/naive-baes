const express = require("express");
const Router = express.Router();
const user = require("../model/user.model");
const axios = require("axios");

Router.route("/keywordSearch")
    .get(async (req, res) => {

        let keywordList = []

        let config = {
            method: 'get',
            url: 'http://35.90.190.108/autocomplete',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios(config)
            .then(function (response) {

                keywordList = response.data;
                

            })
            .catch(function (error) {
                console.log(error);
            });

        res.status(200).render("keywordsearch.ejs",{
            "keywordList":keywordList['keywords']
        });
    })

    .post(async (req, res) => {
        let caseSearch = req.body.caseSearch;
        let pdfNumber = req.body.number;

        caseSearch = '{"key":' + caseSearch + '}'
        caseSearch = JSON.parse(caseSearch)['key'];
        let skeys = [];
        for (let i of caseSearch) {
            skeys.push(i.value);
        }

        let data = JSON.stringify({
            "search_key": skeys,
            "top": Number(pdfNumber) || 10,
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

                let docs = response.data["docs"];

                res.render("keywordResult.ejs",
                    {
                        "docs": docs,
                        "skeys" : skeys
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    })


module.exports = Router;