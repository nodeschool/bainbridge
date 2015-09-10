var express = require('express');
var router = express.Router();

var getBooksFilteredByTerm = function(req, res, next)
{
    var term = req.params.term;

    if(typeof term !== 'undefined' && term.length)
    {
        var filteredBooks = req.resources.books.filter(function(ob)
        {
            return  ob.title.toLowerCase().indexOf(term.toLowerCase()) != -1 ||
                    ob.author.toLowerCase().indexOf(term.toLowerCase()) != -1;
        });

        res.json(filteredBooks);
    }else
    {
        res.json(req.resources.books);
    }
};

router.get('/', function(req, res, next)
{
    res.json({server: 'Book Library', version: '1.0'});
});

router.get('/books', getBooksFilteredByTerm);
router.get('/books/search/:term', getBooksFilteredByTerm);

module.exports = router;