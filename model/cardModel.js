const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    websiteURL: {
        type: String
    },
    socialURLs: {
        type: [String],
        default: []
    },

    companyLogo:{
        type:String,
        required:true
    }
},
    { timestamps: true }
)



module.exports = mongoose.model('cards', cardSchema)