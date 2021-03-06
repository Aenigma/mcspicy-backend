# mcspicy project

This application demonstrates how to use the Bluemix Cloudant NoSQL DB service.  It helps users organize their favorite files. The UI talks to a RESTful Express CRUD backend API.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/Aenigma/mcspicy-backend/)

## Run the app locally

1. [Install Node.js][]
+ cd into this project's root directory
+ Copy the value for the VCAP_SERVICES envirionment variable from the application running in Bluemix and paste it in a `vcap-local.json` file
+ Create an `env` file with export statements for `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`
+ Run `npm install` to install the app's dependencies
+ Run `./run.sh` to start the app for development and `npm start` for prod
+ Access the running app in a browser at <http://localhost:3000>

[Install Node.js]: https://nodejs.org/en/download/
