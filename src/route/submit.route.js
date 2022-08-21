const express = require("express");
const Router = express.Router();
const multer = require("multer");
const judgement = require("../model/judgement.model")
const { cloudinary, storage } = require("../cloudinary/index");
const upload = multer({ storage });


// const cloudinaryImageUploadMethod = async file => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (err, res) => {
//             if (err) return res.send("upload image error")
//             resolve(res.secure_url)
//         }
//         )
//     })
// }

Router.route("/submit")
    .get(async (req, res) => {
        res.render("submit.ejs");
        // res.send("Submit Page")
    })
    .post(upload.array("documents", 100), async (req, res) => {
        // const user = await judgement?.findOne({ licenseID });

        let files = [];
        try {

            let filesold = req.files;

            for (let item in filesold) {
                let filesnew = {
                    url: filesold[item].path,
                    fileType: filesold[item].path.split(".")[filesold[item].path.split(".").length - 1],
                }
                files.push(filesnew);
            }

            // console.log(files);


            const newJudgement = new judgement({
                licenseID: req.body.licenseID, //* We will get this using cookies
                crimeDate: req.body.crimeDate,
                crimeLocation: req.body.crimeLocation,
                documents: files
            });


            // const dataSubmitted = await newJudgement.save(); //! Not working currently

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
            return res.status(500).json({
                error: "true",
                message: "Error before saving data",
            });
        }
        // )

    })



module.exports = Router;