const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default : Date.now 
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

predictionSchema.pre('save', function preSave(next) {
    var schema = this;
    schema.updatedAt(Date.now());
    next();
});

const Prediction = new mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;