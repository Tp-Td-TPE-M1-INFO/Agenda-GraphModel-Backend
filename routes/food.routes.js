const router = require('express').Router();
const Food = require ('../controllers/food.controller');
const Recommendation = require('../controllers/recommendation.controller');

router.get('/recommend/:id', Recommendation.foodRecommendation);
router.get('/food', Food.getFoods);

module.exports = router;