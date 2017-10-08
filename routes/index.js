const express = require('express')
const fileUpload = require('express-fileupload');
const router = express.Router()

const {SpiceService} = require('../services/spiceservice');
const {uploadImage, detectFood} = require('../services/image_handle');

const service = new SpiceService();

function ingredientize(recipes) {
  let map = {};

  recipes.forEach((recipe) => {
    recipe.ingredients
    .filter((e) => e.ingredientProductUpc)
    .forEach((ingredient) => {
      let name = ingredient.ingredientName;
      if(!map[name]) {
        map[name] = {
          name: ingredient.ingredientName,
          recipes: [],
          ingredientProductLink: recipe.ingredientProductLink
        };
      }

      map[name].recipes = [...map[name].recipes, {
        title: recipe.title,
        custom_url: recipe.custom_url
      }];
    });
  });

  return Object.values(map);
}

router.use(fileUpload());

router.get('/', function(req, res){
  res.json({ title: 'Cloudant Boiler Plate' });
});

router.get('/search/:name', function(req, res, next) {
  service.search(req.params.name, (err, result) => {
    if (err) {
      throw err;
    }

    const transformed = ingredientize(result.rows.map((row) => row.doc));
    res.json(transformed);
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

    let best = data.Labels.slice(0, 1);

    if(best.length !== 1) {
      return res.json({
          query: '',
          confidence: 0,
          result: []
      });
    }

    best = best[0];

    service.search(best.Name, (err, result) => {
      if(err) {
        throw err;
      }

      const transformed = ingredientize(result.rows.map((row) => row.doc));

      console.log(best);
      res.json({
        query: best.Name,
        confidence: best.Confidence,
        result: transformed
      });
    });
  });
});

module.exports = router;
