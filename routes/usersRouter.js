const router = require("express").Router()
const { getAllUsers, updateUser, deleteUser } = require("./../controllers/userController")

router.route("/").get(getAllUsers).patch(updateUser).delete(deleteUser)



module.exports = router