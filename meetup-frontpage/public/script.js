$(function()
{
    $.get('/ip.txt', function(ip)
    {
        $('#ip').html('Go To: http://' + ip);
    });
});