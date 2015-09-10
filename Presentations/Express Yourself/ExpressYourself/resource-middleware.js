var resources =
{
    users:
    [
        {
            name: 'A Tester',
            access_token: '1',
            username: 'tester1',
            password: 'tester',
            books: []
        },
        {
            name: 'B Tester',
            access_token: '2',
            username: 'tester2',
            password: 'tester',
            books: []
        }
    ],

    books:
    [
        {
            title: 'First Book',
            author: 'First Author'
        },
        {
            title: 'Second Book',
            author: 'Second Author'
        },
        {
            title: 'Third Book',
            author: 'Third Author'
        },
        {
            title: 'Fourth Book',
            author: 'Fourth Author'
        },
        {
            title: 'Fifth Book',
            author: 'Fifth Author'
        },
        {
            title: 'Sixth Book',
            author: 'Sixth Author'
        }
    ]
};

module.exports = function(req, res, next)
{
    req.resources = resources;
    next();
};