const LibraryMongo = require('../models/LibraryMongo')
const LibrarySql = require('../models/LibraryMySQL')

const dotenv = require('dotenv');
dotenv.config();

module.exports = dotenv.DBTYPE == "mongo" ? LibraryMongo : LibrarySql
