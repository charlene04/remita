const router = require("express").Router()
const { getAllProducts, getOneProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getOneProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router;