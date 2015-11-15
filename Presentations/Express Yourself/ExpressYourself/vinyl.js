var getRecordsFilteredByTerm = function(req, res, next)
{
    var term = req.params.term;

    if(typeof term !== 'undefined' && term.length)
    {
        var filteredRecords = req.resources.records.filter(function(ob)
        {
            return  ob.title.toLowerCase().indexOf(term.toLowerCase()) != -1 ||
                    ob.group.toLowerCase().indexOf(term.toLowerCase()) != -1;
        });

        res.json(filteredBooks);
    }else
    {
        res.json(req.resources.records);
    }

    return next();
};

module.exports = getRecordsFilteredByTerm;
