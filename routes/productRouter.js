const router = require("express").Router()
const { addCategory, addCoupon, getAllProducts, getOneProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getOneProduct).patch(updateProduct).delete(deleteProduct)


// CATEGORY AND TOKEN



router.route('/category').post(addCategory)
router.route('/coupon').post(addCoupon)

module.exports = router;
module.exports = router;