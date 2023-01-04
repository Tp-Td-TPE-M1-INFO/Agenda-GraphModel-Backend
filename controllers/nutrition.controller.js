const Nutrition = require('../model/nutrition.model');
const User = require('../model/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createNutrition = (req, res) =>{
    const nutrition = new Nutrition({
        userId: req.params.id,
        date: req.body.date,
        foods: req.body.foods,
        nbEaten: req.body.nbEaten,
        qtyWater: req.body.qtyWater,
        eatingFruit: req.body.eatingFruit,
        nbMovement: req.body.nbMovement,
        healthProblem: req.body.healthProblem
    });

    nutrition.save()
        .then(nutrition => res.status(201).json(nutrition))
        .catch(err => res.status(400).json(err));
};

module.exports.readNutrition = (req, res) =>{
    Nutrition.find({userId: req.params.id})
        .then((nutritions) => res.status(200).json(nutritions))
        .catch((err) => res.status(400).json(err))
};

module.exports.updateNutrition = (req, res) =>{
    const nutrition = new Nutrition({
        userId: req.params.id,
        date: req.body.date,
        food: req.body.food,
        nbEaten: req.body.nbEaten,
        qtyWater: req.body.qtyWater,
        eatingFruit: req.body.eatingFruit,
        nbMovement: req.body.nbMovement,
        heathProblem: req.body.heathProblem
    });

    Nutrition.updateOne({_id: req.params.id}, nutrition)
        .then(() => res.status(200).json(nutrition))
        .catch(err => res.status(400).json({err}))
};

module.exports.deleteNutrition = (req, res) =>{
    Nutrition.deleteOne({_id: req.params.id})
        .then(nutrition => res.status(200).json(nutrition))
        .catch(err => res.status(400).json(err));
};