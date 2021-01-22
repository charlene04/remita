const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: { type: String, 
    lowercase: true, 
    trim: true
    }
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;