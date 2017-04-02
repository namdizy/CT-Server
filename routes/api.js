/**
 * Created by Nnamdi on 3/29/2017.
 */
const express = require('express');
const router = express.Router();
const yelpPlaces = require('../modules/yelp-places')

router.get('/places', function(req, res, next) {
    yelpPlaces.places(req.query).then(function (response) {
        res.send(response);
    });
});

module.exports = router;