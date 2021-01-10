const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required']
    },
    customerEmail: {
        type: String, 
        required: [true, 'Customer email is required']
    },
    token: {
        type: String,
        required: [true, 'A token is required']
    },
    total: {
        type: Number,
        required: [true, 'Total cost is required']
    },
    discount:{
        type: Number,
        required: [true, 'Discount is required']
    },
    products: [
        {name: String, quantity: Number, sum: Number}
    ],
    submittedInfo:{
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }

})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;