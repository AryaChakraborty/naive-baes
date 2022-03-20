const express = require("express");
const Router = express.Router();
const { storage , upload } = require("../multer/index");
const Tesseract = require("tesseract.js");

Router.route("/predict")
    .get(async(req,res)=>{
        res.json(
            {
                msg: "Dashboard route working"
            }
        )
    })
    .post(upload.single("image"),async (req, res) => {
        try {
            Tesseract.recognize(
                path.join(__dirname, `../static/uploads/`)+ req.file.filename,
                'eng',
                { logger: m => console.log(m) }
              ).then(({ data: { text } }) => {
                return res.json({
                    msg:text
                })
              }).catch((err) =>{ console.log(err)})
    
        }
        catch (err) {
            console.log(err);
        }
    })



module.exports = Router;