const router = require("express").Router()
const { login, userSignupForm, userLoginForm, signup, passportAuth } = require("../controllers/authController")


router.route('/login').get(userLoginForm).post(login)
router.route('/signup').get(userSignupForm).post(signup)

module.exports = router;