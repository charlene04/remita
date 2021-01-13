const router = require("express").Router()
const { gallery } = require("../controllers/shopController")


router.route("/").get(gallery)

module.exports = router