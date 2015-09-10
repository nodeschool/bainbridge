var errors =
{
    'UnknownError': { code: 500, message: 'Unknown error.' },
    'InvalidCredentials': { code: 401, message: 'Invalid credentials.' },
    'BookNotFound': { code: 404, message: 'Book not found.' },
    'Unauthorized': { code: 401, message: 'Unauthorized.' }
};

module.exports = function(err, req, res, next)
{
    var error = false;

    if(err.message in errors)
    {
        var error = errors[err.message];
    }else
    {
        var error = errors['UnknownError'];
    }

    res.status(error.code).json(error);
};