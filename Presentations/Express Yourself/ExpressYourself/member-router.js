var express = require('express');
var router = express.Router();

router.use(function(req, res, next)
{
    if(typeof req.user === 'undefined')
    {
        next(new Error('Unauthorized'));
    }else
    {
        next();
    }
});

router.get('/books', function(req, res, next)
{
    res.json(req.user.books);
});

router.post('/books', function(req, res, next)
{
    var newBook = req.body;

    var foundBook = req.resources.books.filter(function(ob)
    {
        return ob.title === newBook.title;
    });

    if(foundBook.length == 1)
    {
        foundBook = foundBook[0];

        var foundExistingBook = req.user.books.filter(function(ob)
        {
            return ob == foundBook;
        });

        if(foundExistingBook.length == 0)
        {
            req.user.books.push(foundBook);
        }

        res.json(req.user.books);
    }else
    {
        next(new Error('BookNotFound'));
    }
});

router.delete('/books/:title', function(req, res, next)
{
    var bookTitle = req.params.title;

    for(var i = 0; i < req.user.books.length; ++i)
    {
        var book = req.user.books[i];

        if(book.title === bookTitle)
        {
            req.user.books.splice(i, 1);

            res.json(req.user.books);

            return;
        }
    }

    next(new Error('BookNotFound'));
});

module.exports = router;