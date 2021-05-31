const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/googleMongo');
 
const searchSchema = new mongoose.Schema({
    search: String,
}, { collection: 'search' }
);


const searchResultSchema = new mongoose.Schema({
    search: String,
    searchInfo: Array,
}, { collection: 'searchResult' }
);


module.exports = { Mongoose: mongoose, SearchSchema: searchSchema , SearchResultSchema: searchResultSchema }