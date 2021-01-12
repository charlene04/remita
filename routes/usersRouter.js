const router = require("express").Router()
const { getAllUsers, updateUser, deleteUser, getUser } = require("./../controllers/userController")
const { restrictTo } = require("./../middlewares/middlewares")

router.route("/").get(restrictTo("admin"), getAllUsers)
router.route("/:id").get(restrictTo("admin"), getUser).patch(restrictTo("admin"), updateUser).delete(restrictTo("admin"), deleteUser)



module.exports = router