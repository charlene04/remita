const router = require("express").Router()
const { getCart, createCart, cartSummary, updateCartCustomerInfo, updateCartPayment } = require("../controllers/cartController")

router.route('/').get(getCart).post(createCart)

router.route('/:id').get(cartSummary).patch(updateCartCustomerInfo).put(updateCartPayment)

module.exports = router;