const router = require("express").Router()
const { getAllCheckouts, getCheckout, updateCheckout, deleteCheckout } = require("./../controllers/checkoutController")
const { restrictTo } = require("./../middlewares/middlewares")

router.route("/").get(restrictTo("admin"), getAllCheckouts)
router.route("/:id").get(getCheckout).patch(updateCheckout).delete(deleteCheckout)


module.exports = router