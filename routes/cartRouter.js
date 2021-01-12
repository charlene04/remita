const router = require("express").Router()
const { applyCoupon, getCart, createCart, cartSummary, updateCartCustomerInfo, updateCartPayment } = require("../controllers/cartController")
const { isLoggedIn } = require("./../middlewares/middlewares")

router.route('/').get(isLoggedIn, getCart).post(isLoggedIn, createCart)

router.route('/:id').get(isLoggedIn, cartSummary).patch(isLoggedIn, updateCartCustomerInfo).put(isLoggedIn, updateCartPayment)
router.route('/:id/coupon').post(applyCoupon)
module.exports = router;