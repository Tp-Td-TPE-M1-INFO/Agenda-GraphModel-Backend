const User = require('../model/user.model');
const Nutrition = require('../model/nutrition.model');
const Food = require('../model/food.model');
const HeathProblem = require('../model/heathProblem.model');

module.exports.foodRecommendation = async (req, res) => {
    const user = User.findOne({_id: req.params.id});
    const nutritions = await Nutrition.find({userId: req.params.id})

    const foods = [];
    let glucideScore = 0;
    let proteineScore = 0;
    let lipideScore = 0;
    let selScore = 0;
    try{
        
        for(i in nutritions)
        {
            for( j in nutritions[i].foods){
                let foodT = await Food.findById({_id: nutritions[i].foods[j]})
                glucideScore += foodT.glucide;
                proteineScore += foodT.proteine;
                lipideScore += foodT.lipide;
                selScore += foodT.sel;
            }
        }
        
        for(j in user.illness){
            let illness = await HeathProblem.findById({_id: user.illness[j]})
            glucideScore +=  illness.glucide;
            proteineScore += illness.proteine;
            lipideScore += illness.lipide;
            selScore += illness.sel;
        }
        
        if(glucideScore <= 200) foods.push( await Food.find({ glucide:{$gt: 70}}).limit(3).sort({'glucide': -1}));
        else if(glucideScore >= 1000) foods.push( await Food.find({ glucide:{$lt: 10}}).limit(3).sort({'glucide': 1}));
        else if(glucideScore > 200 && glucideScore < 1000) foods.push( await Food.find({ glucide:{$gt: 20, $lt: 60}}).limit(3));

        if(proteineScore <= 200) foods.push( await Food.find({ proteine:{$gt: 70}}).limit(3).sort({'proteine': -1}));
        else if(proteineScore >= 1000) foods.push(Food.find({ proteine:{$lt: 10}}).limit(3).sort({'proteine': 1}));
        else if(proteineScore >200 && proteineScore < 1000) foods.push(await Food.find({ proteine:{$gt: 20, $lt: 60}}).limit(3));

        if(lipideScore <= 200) foods.push(await Food.find({ lipide:{$gt: 70}}).limit(3).sort({'lipide': -1}));
        else if(lipideScore >= 1000) foods.push(await Food.find({ lipide:{$lt: 10}}).limit(3).sort({'lipide': 1}));
        else if(lipideScore > 200 && lipideScore < 1000) foods.push(await Food.find({ lipide:{$gt: 20, $lt: 60}}).limit(3));
    
        if(selScore <= 100) foods.push(await Food.find({ sel:{$gt: 30}}).limit(3).sort({'sel': -1}));
        else if(selScore >= 1000) foods.push(await Food.find({ sel:{$lt: 5}}).limit(3).sort({'sel': 1}));
        else if(selScore > 100 && selScore < 1000) foods.push(await Food.find({ sel:{$gt: 20, $lt: 40}}).limit(3));

       return res.status(200).json(foods);
    }
    catch(err){
        return res.status(400).json(err);
    }

}