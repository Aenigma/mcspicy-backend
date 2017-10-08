/*
 * Performs a one-time upload of recipes from the mccormick api
 */

const fs = require('fs');
const fetch = require('node-fetch');
const {promisify} = require('util');

var cloudant = require('./cloudant');

const apiHeaders = {
  "Content-Type": "application/json",
  "x-api-key": "VwkCbHU6Ww9IgaZtzrUhk5ITgDy0vBXm4IMqZ9vc"
};

function products(page) {
  var myRequest = new Request(`https://gdt-api.mccormick.com/products?size=200&page=${page}`, {
    method: 'GET',
    headers: apiHeaders,
    mode: 'cors',
    cache: 'default'
  });

  return fetch(myRequest).then(res => res.json()).then(res => res.content);
}


function getRecipes(page) {
  return fetch(`https://gdt-api.mccormick.com/recipes?size=100&page=${page}`, {
    method: 'GET',
    headers: apiHeaders,
    mode: 'cors',
    cache: 'default'
  }).then(res => res.json()).then(res => res.content);
}

async function saveRecipeDocument(recipe) {

}

async function submitAllRecipes() {
  const bulkUploadAsync = promisify(db.bulk); // (A)
  let i = 0;
  let recipes;
  do {
    recipes = await getRecipes(i);
    bulkUploadAsync({docs: recipes});
    i++;
  } while(recipes.length > 0)
}

submitAllRecipes();
