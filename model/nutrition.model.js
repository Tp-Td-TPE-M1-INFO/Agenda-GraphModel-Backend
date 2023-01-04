const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },

    date: {
        type: String,
        default: Date.now()
    },

    foods:{
        type:[String]
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
    healthProblem: {
        type: [String],
    } 
});

module.exports = mongoose.model('nutrition', NutritionSchema);