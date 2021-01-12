const router = require("express").Router()
const { updateProductImage, addCategory, addCoupon, getAllProducts, getOneProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")
const { restrictTo, isLoggedIn } = require("./../middlewares/middlewares")


router.route('/').get(isLoggedIn, restrictTo('admin'), getAllProducts).post(isLoggedIn, restrictTo("admin"), createProduct)
router.route('/:id').get(isLoggedIn, restrictTo("admin"), getOneProduct).patch(isLoggedIn, restrictTo("admin"), updateProduct).delete(isLoggedIn, restrictTo("admin"), deleteProduct)
router.route('/:id/image').post(updateProductImage)

// CATEGORY AND TOKEN



router.route('/category').post(addCategory)
router.route('/coupon').post(addCoupon)

module.exports = router;
module.exports = router;