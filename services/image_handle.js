//const crypto = require('crypto');
const fs = require('fs');
//const hash = crypto.createHash('sha256');
const uuid = require('uuid/v4');

// Load credentials and set region from JSON file
const AWS = require('aws-sdk');

// For dev purposes only
AWS.config.update({
  accessKeyId: 'AKIAIOSG7VTVBLDDSFVQ',
  secretAccessKey: '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',
  region:'us-west-2'
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});

//Add Image Name as Param
function detectFood(photoname, cb){
  var params = {
    Image: {
      S3Object: {
        //Bucket: "arn:aws:s3:::peoplepics",
        Bucket: "peoplepics",
        Name: photoname
      }
    }
  };

  rekognition.detectLabels(params, cb);
}

//Add Path Param
function uploadImage(buffer, cb) {
  // TODO: one day
  // const hashBuf = Buffer.from(buffer);
  const fileName = uuid();
  s3.upload({
    Bucket: 'peoplepics',
    Key: fileName,
    Body: buffer,
    ACL: 'public-read'
  }, function (resp) {
    console.log('Successfully uploaded package.');
    detectFood(fileName, cb);
  });
}

module.exports.uploadImage = uploadImage;
module.exports.detectFood = detectFood;
