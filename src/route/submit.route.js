const express = require("express");
const Router = express.Router();
const judgement = require("../model/judgement.model");
const { upload } = require("../multer/index");
const { uploadFile } = require("../services/s3.service");
const request = require('request');

Router.route("/submit")
    .get(async (req, res) => {
        res.render("submit.ejs");
    })
    .post(upload.array("documents", 100), async (req, res) => {

        try {

            let files = [];
            let filesold = req.files;

            for (let file of filesold) {

                const result = await uploadFile(file);

                let filesnew = {
                    url: result.Location,
                    fileType: file.mimetype,
                }
                files.push(filesnew);
            }

            console.log(files);


            const newJudgement = new judgement({
                licenseID: req.body.licenseID, //* We will get this using cookies
                crimeDate: req.body.crimeDate,
                crimeLocation: req.body.crimeLocation,
                documents: files
            });


            newJudgement.save((err, result) => {
                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Error in saving data",
                        error: err
                    });
                }

                else {
                    let _id = newJudgement._id;                    

                    return function(req, res) {
                        request('http://35.90.190.108/', 
                        {
                            json:{_id}
                        },
                        function (error, response, body) {
                            console.error('error:', error); // Print the error
                            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                            console.log('body:', body); // Print the data received
                            res.send(body); //Display the response on the website
                        });

                    }
                }

                // else return res.status(200).json({
                //     message: "Data saved successfully",
                //     result: result
                // });
            })



        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                error: "true",
                message: "Error before saving data",
            });
        }

    })



module.exports = Router;