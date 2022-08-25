const express = require("express");
const Router = express.Router();
// const user = require("../model/user.model");
const axios = require("axios");

Router.route("/loader/:id")
    .get(async (req, res) => {

        let id = req.params.id;
        let data = JSON.stringify({
            "id": id
        });

        let config = {
            method: 'post',
            url: 'http://35.90.190.108/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                // res.redirect("/user/submit");
            })
            .catch(function (error) {
                console.log(error);
            });
    })


module.exports = Router;