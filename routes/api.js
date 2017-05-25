/**
 * Created by Nnamdi on 3/29/2017.
 */
const express = require('express');
const router = express.Router();
const yelpPlaces = require('../modules/yelp-places')
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FoodTruck = mongoose.model('FoodTruck');

router.get('/places', function(req, res, next) {
    yelpPlaces.places(req.query).then(function (response) {
        res.send(response);
    });
});

router.get('/users', function (req, res, next) {
    User.find(function (err, users) {
        if (err) { return next(err); }

        res.json(users);
    });
});

router.get('/foodTrucks', function (req, res, next) {
    FoodTruck.find(function (err, foodTrucks) {
        if (err) { return next(err); }

        res.json(foodTrucks);
    });
});

module.exports = router;