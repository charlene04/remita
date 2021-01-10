const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        required: [true, 'Coupon cannot be empty']
    },
    value: {
        type: Number, 
        required: [true, 'Value cannot be empty']
    }

})

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;