const router = require("express").Router()
const { gallery, productDetail, productCategory } = require("../controllers/shopController")


router.route("/").get(gallery)
router.route("/:id").get(productDetail)
router.route("/category/:category").get(productCategory)

module.exports = router