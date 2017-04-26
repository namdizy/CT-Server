var mongoose = require('mongoose');

var ReviewSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: String,
    rating: Number,
    foodTruck: {type: mongoose.Schema.Types.ObjectId, ref: 'FoodTruck'}
});

module.exports = mongoose.model('Review', ReviewSchema);