const router = require("express").Router()
const { getAllCarts, createCart, getOneCart, updateCart, deleteCart } = require("../controllers/cartController")

router.route('').get(getAllCarts).post(createCart)
router.route('/:id').get(getOneCart).patch(updateCart).delete(deleteCart)

module.exports = router;