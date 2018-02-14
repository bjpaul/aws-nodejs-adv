// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-1'});
// Create EC2 service object
ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  Filters: [
    {
      Name: 'tag:Snapshot',
      Values: ['True']
    }
  ]
};

var printInstanceImageIdOnSuccess = function(data) {
  data.Reservations.forEach((record) => {
      record.Instances.forEach((instance) => {
        console.log("printInstanceImageIdFunction -> ImageId:",instance.ImageId);
      });
  });
};

var printInstanceTypeOnSuccess = function(data) {
  data.Reservations.forEach((record) => {
      record.Instances.forEach((instance) => {
        console.log("printInstanceTypeFunction -> InstanceType:", instance.InstanceType);
      });
  });
};

var onErrorResponse = function(response){
  console.log("Error", err.stack);
};


var request1 = ec2.describeInstances(params);
var request2 = ec2.describeInstances(params);

var promise1 = request1.promise();
var promise2 = request2.promise();
// handle promise's fulfilled/rejected states
promise1
  .then(printInstanceImageIdOnSuccess)
  .catch(onErrorResponse);

promise2
  .then(printInstanceTypeOnSuccess)
  .catch(onErrorResponse);

Promise.all([promise1, promise2])
  .then(function(response){
    console.log("Execution Complete...");
  });
