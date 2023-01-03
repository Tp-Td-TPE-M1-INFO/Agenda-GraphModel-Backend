const mongoose= require('mongoose');

const HealthSchema = mongoose.Schema({
    name:{
        type:String,
    },
    glucide:{
        type: Number,
        min:0,
    },
    proteine:{
        type: Number,
        min:0
    },
    lipide:{
        type: Number,
        min:0,
    },
    sel:{
        type: Number,
        min:0,
    },
})

module.exports = mongoose.model('healthProblem', HealthSchema);