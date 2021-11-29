// config/envparser.js
const DotEnv = require('dotenv')
const result = DotEnv.config()
const _ = require('lodash');

let parsedEnv

if (!('error') in result) {
    parsedEnv = result.parsed
} else {
    parsedEnv = {}
    _.each(process.env, (value, key) => parsedEnv[key] = value);
}

module.exports = function() {
    return parsedEnv
} 
    