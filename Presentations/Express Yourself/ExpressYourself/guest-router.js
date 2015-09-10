var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next)
{
    var matchedUser = req.resources.users.filter(function(ob)
    {
        return ob.username === req.body.username && ob.password === req.body.password;
    });

    if(matchedUser.length == 1)
    {
        res.json(matchedUser[0]);
    }else
    {
        next(new Error('InvalidCredentials'));
    }
});

module.exports = router;