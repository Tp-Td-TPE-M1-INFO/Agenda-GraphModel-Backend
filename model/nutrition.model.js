const mongoose = require('mongoose');
const Food = require('./food.model');

const NutritionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    food:{
        type: [Food.Schema],
    },
    nbEaten:{
        type: Number,
        min: 0,
        max: 10,
        
    }, 

    qtyWater:{
        type: Number,
        required: true
    },

    eatingFruit:{
        type:Boolean,
        default : false
    },
    nbMovement: {
        type: Number,
        default:0
    },
    heathProblem: {
        type: [String],
        required: true
    } 
});

module.exports = mongoose.model('nutrition', NutritionSchema);