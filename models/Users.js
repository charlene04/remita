const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const dateFormat = require("dateformat")

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a user'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Email is required for a user'],
        unique: true,
        lowercase: true,
        trim: true
    },
    location:{
        type: String,
        required: [true, 'location is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        select: false
    },
    joined:{
        type: String,
        default: dateFormat(Date.now(), 'fullDate')
    },
    
})
UserSchema.plugin(passportLocalMongoose, options);

// UserSchema.pre("save", async function(next){
//     if(!this.isModified('password')) return next()

//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })
UserSchema.methods.correctPassword = async function(providedPassword, password){
    return await bcrypt.compare(providedPassword, password)
};

const User = mongoose.model('User', UserSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
passport.authenticate('local', {failureFlash: 'Invalid username or password.'})
passport.authenticate('local', {successFlash: 'Welcome!'})


module.exports = User