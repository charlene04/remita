const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String, 
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;