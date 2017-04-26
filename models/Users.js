var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    points: Number,
    following: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'FoodTruck'},
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
         ],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    bio: String
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};
UserSchema.methods.generateJWT = function(){

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

module.exports = mongoose.model('User', UserSchema);