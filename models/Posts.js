var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    foodTruck: {type: mongoose.Schema.Types.ObjectId, ref: 'FoodTruck'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    picture: String,
    caption: String,
    likes: Number
});

module.exports = mongoose.model('Post', PostSchema);