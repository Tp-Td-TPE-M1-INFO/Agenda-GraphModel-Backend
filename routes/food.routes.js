const router = require('express').Router();
const Food = require ('../controllers/food.controller');
const Recommendation = require('../controllers/recommendation.controller');

router.get('/recommend/:id', Recommendation.foodRecommendation);
router.get('/getfood', Food.getFoods);
router.post('/postfood', Food.createFood);

module.exports = router;