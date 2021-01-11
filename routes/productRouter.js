const router = require("express").Router()
const { addCategory, addCoupon, getAllProducts, getOneProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")
const { restrictTo, isLoggedIn } = require("./../middlewares/middlewares")


router.route('/').get(isLoggedIn, restrictTo('admin'), getAllProducts).post(isLoggedIn, restrictTo("admin"), createProduct)
router.route('/:id').get(isLoggedIn, restrictTo("admin"), getOneProduct).patch(isLoggedIn, restrictTo("admin"), updateProduct).delete(isLoggedIn, restrictTo("admin"), deleteProduct)


// CATEGORY AND TOKEN



router.route('/category').post(addCategory)
router.route('/coupon').post(addCoupon)

module.exports = router;
module.exports = router;