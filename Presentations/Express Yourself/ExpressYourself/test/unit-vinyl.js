var test = require('tape');
var vinyl = require('../vinyl.js');
var _ = require('hamjest');

/**
 * Unit tests for vinyl.js feature.
 */

test('testVinylList', function(t) {
  var req = mockRequest();
  var res = mockResponse();
  
  vinyl(req, res, function() { t.end(); });
});

