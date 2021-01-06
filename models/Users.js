const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcryptjs")
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a user'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required for a user'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    location:{
        type: String,
        required: [true, 'location is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    joined:{
        type: Date,
        default: Date.now()
    },
    
})
UserSchema.plugin(require("mongoose-autopopulate"));
UserSchema.plugin(passportLocalMongoose);

UserSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
UserSchema.methods.correctPassword = async function(providedPassword, password){
    return await bcrypt.compare(providedPassword, password)
};

const User = mongoose.model('User', UserSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy({ usernameField: 'email' }, User.authenticate()));
passport.authenticate('local', {failureFlash: 'Invalid username or password.'})
passport.authenticate('local', {successFlash: 'Welcome!'})


module.exports = User