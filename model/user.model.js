const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const heathProblem = require('./heathProblem.model');

const userSchema = mongoose.Schema({

    surname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 256,
    },
    name:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 256, 
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        maxlength: 55,
        trim: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        minlength: 6,
    },
    picture: {
        type: String,
        default: "/upload/random-user.png"
    },
   illness: {
        type:[heathProblem.schema]
    },
},
{
    timestamps: true,
}

);
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        //return res.status(401).json({ message: "paire nom d'utilisateur/mot de passe incorrecte"});
        throw Error ('incorrect password');
    }
   // return res.status(401).json({ message: "paire nom d'utilisateur/mot de passe incorrecte"});4
   throw Error ('incorrect username');
}

const UserModel =  mongoose.model('user',userSchema);
module.exports = UserModel;
