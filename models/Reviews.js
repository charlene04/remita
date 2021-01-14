const mongoose = require('mongoose')
const dateFormat = require("dateformat")

const reviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a new product']
    },
    content: {
        type: String, 
        required: [true, 'Content cannot be blank']
    },
    location: String,
     
    date: {
        type: Date,
        default: dateFormat(Date.now(), 'paddedShortDate')
    }
})

const Review = mongoose.model('Review', reviewsSchema);
module.exports = Review