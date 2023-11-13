
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

//const Schema = mongoose.Schema;

//structure of data
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true //if someone else tries to use email, mongoose wont save

    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); //when we add/update a new doc, it adds create stamp


//static signup method for User
//cant use error function with "this" keyword 
userSchema.statics.signup = async function (email, password) {

    //validation 
    /* we do in controller 
    if (!email || !password){
        //when you throw an error, you must catch it later 
        throw Error ('All fields must be filled')
    }
    */

    //email valid
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid ')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    //check if email already exists - even though we have unique so we can do custom error
    //this refers to model (we dont have User yet until export line)
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)

    //hash salt with password
    const hash = await bcrypt.hash(password, salt)

    //store user and hashed password 
    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    /* we do in controller 
    if (!email || !password){
        //when you throw an error, you must catch it later 
        throw Error ('All fields must be filled')
    }
    */
    const user = await this.findOne({ email })

    if (!user) {
        //check password matches
        throw Error("incorrect email")
    }
    //plain text, hashed version on user document in db - returns T/F
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect pasword')
    }

    return user
}


//model applys schema and creates a pluralized collection 
module.exports = mongoose.model('User', userSchema);

/* const User = mongoose.model('User', userSchema);
model.exports = User */ 