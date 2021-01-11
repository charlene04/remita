const mongoose = require('mongoose')
const dateFormat = require('dateformat')


const cartSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    customerAddress: String,
    customerTel: String,
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
    paymentStatus: {
        type: Boolean,
        default: false
    },
    deliveryStatus: {
        type: String,
        enum: ["Pending", "Delivered", "Cancelled"],
        default: "Pending"
    },
    date:{
        type: String,
        default: dateFormat(Date.now(), 'fullDate')
    },

})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;