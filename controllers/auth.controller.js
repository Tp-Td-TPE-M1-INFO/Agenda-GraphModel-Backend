const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 30 * 24 * 60 * 60 * 1000
const createToken = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
};

const signUpErrors=(err) => {
    let errors = { userName: '', password: '' };
    
    if(err.message.includes('userName'))
        errors.userName = " nom d'utilisateur incorrect ou déjà pris";
  
    if(err.message.includes('password'))
        errors.password = "Le mot de passe doit contenir au moins 6 caractères";
        
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("userName"))
        errors.pseudo = "Ce nom d'utilisateur est déjà pris";

    return errors;
}

module.exports.signUp = async(req, res) =>{
    const user = new User({
        surname : req.body.surname,
        name : req.body.name,
        userName: req.body.userName,
        age: req.body.age,
        password: req.body.password
    });
    user.save()
        .then(()=> res.status(201).json({user: user._id}))
        .catch(error => res.status(400).json(signUpErrors(error)));
}

module.exports.signIn = async (req, res) =>{
    const { userName, password} = req.body;

    try{
        const user = await User.login(userName, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).json({user: user._id});
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"paire nom d'utiliasateur/mot de passe incorrecte"});
    }
};

module.exports.logout = async (req, res) =>{
    res.cookie('jwt', '',{maxAge: 1});
    res.redirect('/');
};