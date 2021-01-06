const router = require("express").Router()
const { add } = require("../controllers/categoryController")


router.route('/').post(add)

module.exports = router;