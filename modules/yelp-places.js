/**
 * Created by Nnamdi on 3/29/2017.
 */
'use strict';

const yelp = require('yelp-fusion');
const config = require('../config/config');

const yelpId = config.yelpClientId;
const yelpSecret = config.yelpClientSecret;


const searchRequest = {
    categories:'',
    latitude: null,
    longitude: null,
    radius: null
};

var places = function (req) {
    searchRequest.latitude = req.latitude;
    searchRequest.longitude = req.longitude;
    searchRequest.radius = req.radius;
    searchRequest.categories = req.types;

    return yelp.accessToken(yelpId, yelpSecret).then(function (resp) {
        const client = yelp.client(resp.jsonBody.access_token);
        return client.search(searchRequest).then(function (response) {
            return response.jsonBody.businesses
        });
    }).catch (function (e) {
        console.log(e)
    });
};

exports.places = places;