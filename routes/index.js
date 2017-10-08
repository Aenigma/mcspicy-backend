const express = require('express')
const fileUpload = require('express-fileupload');
const router = express.Router()

const {SpiceService} = require('../services/spiceservice');
const {uploadImage, detectFood} = require('../services/image_handle');

const service = new SpiceService();

router.use(fileUpload());

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

router.post('/imageSuggest', function(req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const image = req.files.image;
  const buffer = image.data;

  uploadImage(buffer, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(data);
  });

  /*image.mv('./public/uploads/uploaded.jpg', (err) => {
    if(err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
  */

});

module.exports = router;
