const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a new product'],
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
    image: String,
       
    reviews: [],
    category: String
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product