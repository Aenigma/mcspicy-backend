//Add Image Name as Param
function detectFood(){
  var AWS = require('aws-sdk');
  // Load credentials and set region from JSON file
  //AWS.config.loadFromPath('./config.json');
  //AWS.config.loadFromPath('C:/Users/Russe/.aws/credentials')
  AWS.config.update({region:'us-west-2'});
  var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});


  var params = {
    Image: {
     S3Object: {
      //Bucket: "arn:aws:s3:::peoplepics",
      Bucket: "peoplepics",
      Name: "burger.jpg"
     }
    }
   };

   rekognition.detectLabels(params, function(err, data) {
     if (err) console.error(err, err.stack); // an error occurred
     else     console.log(data);
  });
}
//Add Path Param
function uploadImage(){
  var AWS = require('aws-sdk'),
    fs = require('fs');
    // For dev purposes only
    AWS.config.update({ accessKeyId: 'AKIAIOSG7VTVBLDDSFVQ', secretAccessKey: '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' });

    // Read in the file, convert it to base64, store to S3
    fs.readFile('del.txt', function (err, data) {
      if (err) { throw err; }

    var base64data = new Buffer(data, 'binary');

    var s3 = new AWS.S3();
    
    s3.client.upload({
      Bucket: 'peoplepics',
      Key: 'del2.txt',
      Body: base64data,
      ACL: 'public-read'
    },function (resp) {
      console.log(arguments);
      console.log('Successfully uploaded package.');
  });
});
}
