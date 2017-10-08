const {cloudant, db} = require('./cloudant');

class SpiceService {
  search(name, cb) {
    db.search('doc', 'spiceSearch', {
      q:`name:${name} OR ingredient:${name}`,
      include_docs: true
    }, cb);
  }
}

module.exports.SpiceService = SpiceService;
