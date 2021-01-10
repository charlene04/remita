const User = require("./../models/Users")


exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    res.render('users.hbs', { 'users': users, 'title': 'Admin Dashboard' })
}

exports.updateUser = async (req, res) => {
    res.send("HI")
}

exports.deleteUser = async (req, res) => {
    res.send("HI")
}


