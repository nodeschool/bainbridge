var express = require('express');
var router = express.Router();
var getRecordsFilteredByTerm = require('./vinyl.js');

router.get('/vinyl', getRecordsFilteredByTerm);
router.get('/vinyl/search/:term', getRecordsFilteredByTerm);

module.exports = router;
