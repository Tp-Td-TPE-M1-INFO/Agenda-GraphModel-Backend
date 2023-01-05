const HealthProblem = require('../model/heathProblem.model');

module.exports.getHealthProblems = (req, res) =>{
    HealthProblem.find()
        .then((heathProblems) => res.status(200).json(heathProblems))
        .catch((errors) => res.status(400).json(errors));
}

module.exports.createHealtProblem = async (req, res) =>{
    const{name, glucide, proteine, lipide, sel} =req.body;
    try{
        const heathProblem = await HealthProblem.create(name, glucide, proteine, lipide, sel);
        res.status(201).json(healthProblem);
    }
    catch(err) {
        res.status(400).json(err);
    }
};