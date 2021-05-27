const express = require("express");
const router = express.Router();
const { generateResults } = require('../helper/searchHelper');
const db = require('../queries'); 

router.get("/searchResults/:search", function(req, res, next) {
  const searchString = req.params.search;
  res.send({results: generateResults(searchString)});
});

router.post("/searchResults/:search", function(req, res, next) {
  const searchString = req.params.search;
  res.send({search : searchString});
});

module.exports = router;