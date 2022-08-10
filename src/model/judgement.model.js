const mongoose = require('mongoose');

const judgementSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
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

judgementSchema.pre('save', function preSave(next) {
    var schema = this;
    schema.updatedAt(Date.now());
    next();
});

const Judgement = new mongoose.model("Judgement", judgementSchema);

module.exports = Judgement;