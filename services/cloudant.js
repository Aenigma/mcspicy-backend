// sets up cloudant and returns it
// i'm sorry, i just copy and paste boilerplate today

const fs = require('fs');

const DB_NAME = 'recipes';

var cloudant;
var db;

function getDBCredentialsUrl(jsonData) {
  var vcapServices = JSON.parse(jsonData);
  // Pattern match to find the first instance of a Cloudant service in
  // VCAP_SERVICES. If you know your service key, you can access the
  // service credentials directly by using the vcapServices object.
  for (var vcapService in vcapServices) {
    if (vcapService.match(/cloudant/i)) {
      return vcapServices[vcapService][0].credentials.url;
    }
  }
}

function initDBConnection(dbName) {
  var dbCredentials = {
    dbName: dbName
  };
  //When running on Bluemix, this variable will be set to a json object
  //containing all the service credentials of all the bound services
  if (process.env.VCAP_SERVICES) {
    dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
  } else { //When running locally, the VCAP_SERVICES will not be set

    // When running this app locally you can get your Cloudant credentials
    // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
    // Variables section for an app in the Bluemix console dashboard).
    // Once you have the credentials, paste them into a file called vcap-local.json.
    // Alternately you could point to a local database here instead of a
    // Bluemix service.
    // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
    dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
  }

  cloudant = require('cloudant')(dbCredentials.url);

  // check if DB exists if not create
  /* just create the DB prior, jesus christ
  cloudant.db.create(dbCredentials.dbName, function(err, res) {
    if (err) {
      console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
    }
  });
  */

  db = cloudant.use(dbCredentials.dbName);
}

initDBConnection(DB_NAME);

module.exports.cloudant = cloudant;
module.exports.db = db;
