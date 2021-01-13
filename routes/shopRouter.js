const router = require("express").Router()
const { gallery, productDetail } = require("../controllers/shopController")


router.route("/").get(gallery)
router.route("/:id").get(productDetail)

module.exports = router