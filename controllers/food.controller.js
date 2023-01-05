const Food = require('../model/food.model');

module.exports.getFoods = (req, res) =>{
    Food.find()
        .then((foods) => res.status(200).json(foods))
        .catch((errors) => res.status(400).json(errors));
};


module.exports.createFood = async (req, res) =>{
    const {name, glucide, proteine, lipide, sel} = req.body;
    try{
        const food = await Food.create(name, glucide, proteine, lipide, sel);
        res.status(201).json({food});
    } catch(err){
        res.status(400).json(err);
    }    
};