/**
 * Created by Nnamdi on 3/29/2017.
 */
var env = require('./env.json');

var node_env = process.env.NODE_ENV || 'development';
var config = env[node_env]

module.exports = config;