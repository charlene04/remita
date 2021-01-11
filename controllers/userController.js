const User = require("./../models/Users")


exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    res.render('users.hbs', { 'users': users, 'title': 'Admin Dashboard' })
}

exports.updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {role: req.body.role}, {new: true})
    if(updatedUser){
        req.flash("success", "User updated successfully")
        return res.redirect("/admin/users")
    }
    req.flash("error", "Something went wrong!")
    res.redirect("/admin/users")
}

exports.deleteUser = async (req, res) => {
   await User.findByIdAndDelete(req.params.id)
}

exports.getUser = async (req, res) => {
    const user = await User.find({ _id: req.params.id })
    res.status(200).json({
        status: "success",
        data:{
            user
        }
    })
}



