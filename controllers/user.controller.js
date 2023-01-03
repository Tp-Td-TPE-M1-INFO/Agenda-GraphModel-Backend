const User = require('../model/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.userInfo = (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown :'+ req.params.id);

    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}

module.exports.updateUser = (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown :'+ req.params.id);

        const user = new User({
            _id : req.params.id,
            surname : req.body.surname,
            name : req.body.name,
            userName: req.body.userName,
            age: req.body.age,
            password: req.body.password
        });

    User.updateOne({_id: req.params.id}, user)
        .then(() => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
};

module.exports.deleteUser = (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown :'+ req.params.id);
    User.deleteOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}
