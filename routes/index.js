
/*
* GET home page.
*/

const express = require('express')
const router = express.Router()
const {cloudant, db} = require('./../cloudant');

router.get('/', function(req, res){
  res.json({ title: 'Cloudant Boiler Plate' });
});

router.get('/search/:name', function(req, res, next) {
  db.search('doc', 'spiceSearch', {
    q:`name:${req.params.name} OR ingredient:${req.params.name}`,
    include_docs: true
  },
  function(er, result) {
    if (er) {
      throw er;
    }

    res.json(result.rows.map((row) => row.doc));
  });
});

module.exports = router;
