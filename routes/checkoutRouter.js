const router = require("express").Router()
const { getAllCheckouts } = require("./../controllers/checkoutController")

router.route("/").get(getAllCheckouts)


module.exports = router