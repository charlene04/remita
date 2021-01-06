const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please provide product category']
    }
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;