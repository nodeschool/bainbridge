var express = require('express');
var app = express();
var os = require('os');
var fs = require('fs');

app.use(express.static('public'));

app.use (function(req, res, next)
{
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk)
    {
       data += chunk;
    });

    req.on('end', function()
    {
        req.body = data;
        next();
    });
});

app.get('/ip.txt', function(req, res)
{
    var interfaces = os.networkInterfaces();
    var addresses = [];

    for(var k in interfaces)
    {
        for(var k2 in interfaces[k])
        {
            var address = interfaces[k][k2];
            if(address.family === 'IPv4' && !address.internal)
            {
                addresses.push(address.address);
                res.send(addresses[0]);
            }
        }
    }
});

app.post('/rolecall.js', function(req, res)
{
    fs.appendFile('./rolecall.txt', req.body + '\n', function(err) {});

    res.sendStatus(204);
});

var server = app.listen(80, function()
{
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});