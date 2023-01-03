const HealthProblem = require('../model/heathProblem.model');

module.exports.getHealthProblems = (req, res) =>{
    HealthProblem.find()
        .then((heathProblems) => res.status(200).json(heathProblems))
        .catch((errors) => res.status(400).json(errors));
}