var mongoose = require('mongoose');

var FoodTruckSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    bio: String,
    hours: [String],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    profilePicture: String,
    emailAddress: String,
    online: Boolean,
    pictureGallery: [String],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    checkIns: [{type: mongoose.Schema.Types.ObjectId, ref: 'CheckIn'}],
    rating: Number,
    phoneNumber: String,
    location: {},
    status: Number
});

FoodTruckSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
FoodTruckSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};
FoodTruckSchema.methods.generateJWT = function(){

    //set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, 'SECRET');
};

module.exports = mongoose.model('FoodTruck', FoodTruckSchema);