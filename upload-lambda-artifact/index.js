'use strict';
var myFunction = require('bijoy-lambda');
var sampleFunction = require('./sample.js');
console.log('Loading function');

exports.handler = (event, context, callback) => {
    myFunction.printMsg();
    sampleFunction.sampleMsg();
    callback(null, "success");
};
