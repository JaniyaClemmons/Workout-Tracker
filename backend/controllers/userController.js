const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { create } = require('../models/userModel')

/*arg 1: payload on token {_id: _id} === {_id}, 
* arg2: Secret string from env variables (needs to remain hidden, not in code)
*arg3: options -- user logged in for 3 days 
*/
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
}
//signup user
const signupUser = async (req,res) => {
    //res.json({mssg: "login user"});
    //create new user
    //access body with req.body
    const {email, password} = req.body; 

    let emptyFields = [];

    if(!email){
        emptyFields.push('email');
    }
    if(!password){
        emptyFields.push('password');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }

    //Add doc to db
    try{

        const user = await User.signup(email, password);
        //create toke 
        const token = createToken(user._id);
        //Send back a OK response and the email and new document 
        res.status(200).json({email, token}); 
    } catch(error){
        //Send error status and send json with the error msg
        res.status(400).json({error: error.message});
    }
    /* phase one to check routes working: 
    res.json({
        mssg: 'POST new exercise'
    }); */
}


//login user
const loginUser = async (req,res) => {
    //res.json({mssg: "signup user"});
    //access body with req.body
    const {email, password} = req.body; 

    let emptyFields = [];

    if(!email){
        emptyFields.push('email');
    }
    if(!password){
        emptyFields.push('password');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }


    //Add doc to db
    try{
        //const exercise = await exercise.findById({id: req.body.params.id});     
        const user = await User.login(email, password);

        //create token 


       const token = await createToken(user._id);
        //Send back a OK response and the email and new document 
        res.status(200).json({email, token}); 
    } catch(error){
        //Send error status and send json with the error msg
        res.status(400).json({error: error.message});
    }
}



module.exports = {loginUser, signupUser}