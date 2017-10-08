const express = require('express')
const router = express.Router()

const {SpiceService} = require('../services/spiceservice')

const service = new SpiceService();

router.get('/', function(req, res){
  res.json({ title: 'Cloudant Boiler Plate' });
});

router.get('/search/:name', function(req, res, next) {
  service.search(req.params.name, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result.rows.map((row) => row.doc));
  });
});

module.exports = router;
