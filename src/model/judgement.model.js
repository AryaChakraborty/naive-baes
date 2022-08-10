const mongoose = require('mongoose');

const judgementSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    crimeDate: {
        type: Date
    },
    crimeLocation: {
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

const Judgement = new mongoose.model("Judgement", judgementSchema);

module.exports = Judgement;