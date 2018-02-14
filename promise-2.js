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

var onSuccessResponse = function(data) {
  data.Reservations.forEach((record) => {
      record.Instances.forEach((instance) => {
        console.log("ImageId:",instance.ImageId, ", InstanceType:", instance.InstanceType);
      });
  });
};

var onErrorResponse = function(response){
  console.log("Error", err.stack);
};

var onCompletion = function(){
  var d2 = new Date();
  console.log("Start time -> ", d1);
  console.log("End time -> ", d2);
};

var request = ec2.describeInstances(params);

var promise = request.promise();
var d1 = new Date();
// handle promise's fulfilled/rejected states
promise
  .then(function(data) {
    console.log("response recieved..")
    return data;
  })
  .then(onSuccessResponse)
  .then(onCompletion)
  .catch(onErrorResponse);
