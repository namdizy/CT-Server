var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = function() {
    passport.serializeUser(function(user, done){
        console.log('Serializing User: ', user.username);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            console.log('deserializing user: ', user.username);
            return done(err, user);
        });
    });

    //Login Strategy
    passport.use('local-login', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done){
            User.findOne({'username': username},
            function(err, user){
                if(err){
                    return done(err);
                }
                if(!user){
                    console.log('User Not Found with username: ' + username);
                    return done(null, false);
                }
                if(!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false);
                }

                return done(null, user);
            });
        }));
    
    //Signup Strategy
    passport.use('local-signup', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback: true,
    },
        function(req, username, password, done){
            process.nextTick(function(){
                User.findOne({'username': username}, function(err, user){
                    if(err){
                        console.log('Error in Signup: ' + err);
                        return done(null, false);
                    }
                    if(user){
                        console.log('User already exists with username: ' + username);
                        return done(null, false);
                    } else {
                        //if there is no user create one
                        var newUser = new User();

                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);

                        //save new user
                        newUser.save(function(err){
                            if(err){
                                console.log('Error in saving user: ' + err);
                                throw err;
                            }
                            console.log(newUser.username + ' Registration successful');
                            console.log('Password: ' + newUser.password);
                            newUser.token = newUser.generateJWT();
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
    
    var isValidPassword = function(user, password){
        return bcrypt.compareSync(password, user.password);
    };

    var createHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
}