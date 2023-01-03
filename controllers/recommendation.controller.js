const User = require('../model/user.model');
const Nutrition = require('../model/nutrition.model');
const Food = require('../model/food.model');

module.exports.foodRecommendation = (req, res) => {
    const user = User.findOne({_id: req.params.id});
    const nutritions = Nutrition.find({userId: req.params.id});
    const foods = new array(12);
    
    let glucideScore = 0;
    let proteineScore = 0;
    let lipideScore = 0;
    let selScore = 0;
    try{
        
        for(nutrition in nutritions)
        {
            for(i in nutritions.food){
    
                glucideScore +=  nutrition.food[i].glucide;
                proteineScore += nutrition.food[i].proteine;
                lipideScore += nutrition.food[i].lipide;
                selScore += nutrition.food[i].sel;
            }
        }
    
        for(j in user.illness){
            glucideScore +=  user.illness[j].glucide;
            proteineScore += user.illness[j].proteine;
            lipideScore += user.illness[j].lipide;
            selScore += user.illness[j].sel;
        }
        
        if(glucideScore <= 200) foods.push(Food.find({ glucide:{$gt: 70}}).limit(3).sort({'glucide': -1}));
        else if(glucideScore >= 5000) foods.push(Food.find({ glucide:{$lt: 10}}).limit(3).sort({'glucide': 1}));
        else if(glucideScore > 200 && glucideScore < 5000) foods.push(Food.find({ glucide:{$gt: 20, $lt: 60}}).limit(3));

        if(proteineScore <= 200) foods.push(Food.find({ proteine:{$gt: 70}}).limit(3).sort({'proteine': -1}));
        else if(proteineScore >= 5000) foods.push(Food.find({ proteine:{$lt: 10}}).limit(3).sort({'proteine': 1}));
        else if(proteineScore >200 && proteineScore < 5000) foods.push(Food.find({ proteine:{$gt: 20, $lt: 60}}).limit(3));

        if(lipideScore <= 200) foods.push(Food.find({ lipide:{$gt: 70}}).limit(3).sort({'lipide': -1}));
        else if(lipideScore >= 5000) foods.push(Food.find({ lipide:{$lt: 10}}).limit(3).sort({'lipide': 1}));
        else if(lipideScore > 200 && lipideScore < 5000) foods.push(Food.find({ lipide:{$gt: 20, $lt: 60}}).limit(3));
    
        if(selScore <= 100) foods.push(Food.find({ sel:{$gt: 30}}).limit(3).sort({'sel': -1}));
        else if(selScore >= 3000) foods.push(Food.find({ sel:{$lt: 5}}).limit(3).sort({'sel': 1}));
        else if(selScore > 100 && selScore < 3000) foods.push(Food.find({ sel:{$gt: 20, $lt: 40}}).limit(3));

        return res.status(200).json(foods);
    }
    catch(err){
        return res.status(400).json(err);
    }

}