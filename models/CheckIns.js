var mongoose = require('mongoose');

var CheckInSchema = mongoose.Schema({
    foodTruck: {type: mongoose.Schema.Types.ObjectId, ref: 'FoodTruck'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    points: Number,
    date: Date
});

module.exports = mongoose.model('CheckIn', CheckInSchema);