var mongoose = require('mongoose');

var PinSchema = mongoose.Schema({
    name: String,
    location: {},
    caption: String,
    pictureGallery: [String],
    status: Number
});

module.exports = mongoose.model('Pin', PinSchema);