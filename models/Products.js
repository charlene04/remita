const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a new product']
    },
    description: {
        type: String, 
        required: [true, 'Description is required']
    } ,
    price: {
        type: Number, 
        required: [true, "Price is required for a new product"]
    },
    discount: {
        type: Number, 
        default: 0},
    image: {
        type: String,
        required: [true, 'Image is required for a new product']
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    category: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product