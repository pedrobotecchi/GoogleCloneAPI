const express = require("express");
const searchHelper = require("../helper/searchHelper");
const router = express.Router();
const { generateResults } = require('../helper/searchHelper');
const db = require('../schema/mongoDB'); 

router.get("/searchResults/:search", function(req, res, next) {
  const searchString = req.params.search;
  const Search = db.Mongoose.model('searchResult', db.SearchResultSchema, 'searchResult');
  Search.find({search: searchString})
    .then(results => res.send({searchResults : results}))
    .catch(err => res.status(404).json({ success: false }));
});

router.post("/searchResults/:search", async function(req, res, next) {
  const searchString = req.params.search;
  // Check if the search exists on Mongo
  const Search = db.Mongoose.model('search', db.SearchSchema, 'search');
  const search = new Search({ search : searchString });
  const searchInBD = await Search.find({ search: searchString}).lean().exec();
  
  if(searchInBD.length > 0) {
    res.send({search : searchString}); 
  }
  else {
    try {
      await search.save();
      const Search = db.Mongoose.model('searchResult', db.SearchResultSchema, 'searchResult');
      const searchResult = new Search({ search: searchString ,searchInfo : generateResults(searchString) });

      try {
        await searchResult.save();
      } catch (err) {
        next(err);
      }

      res.send({search : searchString}); 
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;