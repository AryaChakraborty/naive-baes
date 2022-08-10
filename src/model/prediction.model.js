const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    crimeDate: {
        type: Date
    },
    documentLanguage: {
        type: String
    },
    documents: [
        {
            image: {
                type: String
            },
            fileType: {
                type: String
            },
            multipage: {
                type: Boolean
            }
        }
    ],
    guilty: {
        type: Boolean
    },
    punishment: {
        type: String
    }
});

const Prediction = new mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;