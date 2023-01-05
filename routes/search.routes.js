const router = require('express').Router();
const algoliasearch = require('algoliasearch');
const client = algoliasearch('W57Z3ASBD4', 'deb46924f6a0ffbe793f087c376371ee');
const index = client.initIndex('index');

router.get('/', function(req, res) {
  const query = req.query.q;
  index.search({ query: query }, function(err, content) {
    if (err) throw err;
    res.send(content);
  });
});

module.exports = router;