const router = require('express').Router();
const HealthProblem = require ('../controllers/healthProblème.controller');

router.get('/get-healthProblem', HealthProblem.getHealthProblems);
router.post('/postfood', HealthProblem.createHealtProblem);

module.exports = router;