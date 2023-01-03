const mongoose= require('mongoose');

const FoodSchema = mongoose.Schema({
    name:{
        type:String
    },
    picture:{
        type: String,
        default: "/upload/food/food.png"
    },
    glucide:{
        type: Number,
        max:100,
        min:0,
    },
    proteine:{
        type: Number,
        max:100,
        min:0,
    },
    lipide:{
        type: Number,
        max:100,
        min:0,
    },
    sel:{
        type: Number,
        max:100,
        min:0,
    },
});

module.exports = mongoose.model('food', FoodSchema);