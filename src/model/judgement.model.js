const mongoose = require('mongoose');

const judgementSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        // unique: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    year: {
        type: Number
    },
    caseNumber: {
        type: String
    },
    region: {
        type: String
    },
    documents: [
        {
            url: {
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
    // guilty: {
    //     type: Boolean
    // },
    punishment: {
        type: String
    }
});

// judgementSchema.pre('save', function preSave(next) {
//     let schema = this;
//     schema.updatedAt(Date.now());
//     next();
// });

const Judgement = new mongoose.model("Document", judgementSchema);

module.exports = Judgement;