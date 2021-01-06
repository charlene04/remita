const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a new product']
    },
    content: {
        type: String, 
        required: [true, 'Content cannot be blank']
    },
     
    date: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model('Review', reviewsSchema);
module.exports = Review