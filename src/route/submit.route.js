const express = require("express");
const Router = express.Router();
const judgement = require("../model/judgement.model");
const { upload } = require("../multer/index");
const { uploadFile } = require("../services/s3.service");


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

                else return res.status(200).json({
                    message: "Data saved successfully",
                    result: result
                });
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