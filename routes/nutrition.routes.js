const router = require('express').Router();
const nutritionController = require('../controllers/nutrition.controller');
const healthProblem = require('../controllers/healthProblème.controller');

router.get('/get-nutrition/:id', nutritionController.readNutrition);
router.post('/post-nutrition/:id', nutritionController.createNutrition);
router.put('/update-nutrition/:id', nutritionController.updateNutrition);
router.delete('/delete-nutrition/:id', nutritionController.deleteNutrition);

// get health problems
router.get('/health-problem',healthProblem.getHealthProblems);

module.exports = router;
