const HealthProblem = require('../model/heathProblem.model');

module.exports.getHealthProblems = (req, res) =>{
    HealthProblem.find()
        .then((heathProblems) => res.status(200).json(heathProblems))
        .catch((errors) => res.status(400).json(errors));
}

module.exports.createHealtProblem = (req, res) =>{
    const food = new HealthProblem({
        name: req.body.name,
        glucide: req.body.glucide,
        proteine: req.body.proteine,
        lipide: req.body.lipide,
        sel: req.body.sel
    });
    
    food.save()
        .then(food => res.status(201).json(food))
        .catch(err => res.status(400).json(err));
};