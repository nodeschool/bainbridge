var test = require('tape');
var vinyl = require('../vinyl.js');
var _ = require('hamjest');

/**
 * Unit tests for vinyl.js feature.
 */

test('testVinylList', function(t) {
  var req = mockRequest();
  var res = mockResponse();

  vinyl(req, res, function() { t.pass('Callback invoked.'); });
  var result = JSON.parse(res.result);
  _.assertThat(result, _.allOf(
      _.hasItem(new Record('Paisley Park', 'Prince')),
      _.hasItem(new Record('IV','Led Zepplin')),
      _.hasItem(new Record('New Order', 'New Order'))));
  t.end();
});

function mockRequest() {
  var req = {
    params : { },
    resources : {
      records : [ new Record('Paisley Park', 'Prince'), new Record('IV','Led Zepplin'), new Record('New Order','New Order')]}};
  return req;
};

function mockResponse() {
   return {
     json : function(val) {
        this.result = JSON.stringify(val);
     }}
}
 
function Record(name, group) {
  return {
     title : name,
     group : group
  }
};


