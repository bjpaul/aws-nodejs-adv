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

var i = 0;
var d1 = new Date();

var request = ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    var d1 = new Date();

    data.Reservations.forEach((record) => {
      console.log("*****************",i++, "*****************" )
        record.Instances.forEach((instance) => {
          console.log("ImageId:",instance.ImageId, ", InstanceType:", instance.InstanceType);
          console.log(" Tags:", instance.Tags);
        });
    });
    var d2 = new Date();
    console.log("Start time -> ", d1);
    console.log("End time -> ", d2);
  }
});
