var test = require('tape');
var _ = require('hamjest');
var request = require('supertest');

test('testGetRoot', function(t) {
  var app = require('../app.js');
  
  request(app)
    .get('/')
    .expect('200')
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      _.assertThat(JSON.parse(res.text), _.is({ server : "Book Library", version : "1.0" }));
      t.end();
    });
});

test('testGetBooks', function(t) {
  var app = require('../app.js');

  request(app)
    .get('/books')
    .expect('200')
    .expect('Content-Type',/json/)
    .end(function (err, res) {
      var books = JSON.parse(res.text);
      _.assertThat(books, _.allOf(
	_.hasItem({ title: 'First Book', author: 'First Author' }),
        _.hasItem({ title: 'Second Book', author: 'Second Author' }),
        _.hasItem({ title: 'Third Book', author: 'Third Author' }),
        _.hasItem({ title: 'Fourth Book', author: 'Fourth Author' }),
        _.hasItem({ title: 'Fifth Book', author: 'Fifth Author' }),
        _.hasItem({ title: 'Sixth Book', author: 'Sixth Author' })
      ));
      t.end();
    });
});

test('testGetVinyl', function(t) {
  var app = require('../app.js');

  request(app)
    .get('/vinyl')
    .expect('200')
    .end(function(err, res) {
      t.fail('Not complete.'); 
      t.end();});
});  
