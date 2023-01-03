const Food = require('../model/food.model');

module.exports.getFoods = (req, res) =>{
    Food.find()
        .then((foods) => res.status(200).json(foods))
        .catch((errors) => res.status(400).json(errors));
};

module.exports.createFood = (req, res) =>{
    const food = new Food({
        name: req.body,
        glucide: req.body.glucide,
        proteine: req.body.proteine,
        lipide: req.body.lipide,
        sel: req.body.sel
    });
    
    food.save()
        .then(food => res.status(201).json(food))
        .catch(err => res.status(400).json(err));
};