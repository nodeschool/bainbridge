$(function()
{
    $.get('/ip.txt', function(ip)
    {
        $('#ip').html('Go To: <span class="code">http://' + ip + '</span>');
    });

    $('#role-call-submit').on('click', function()
    {
        console.log('clicked: ' + $('#role-call-name').val());
        $.post('/rolecall.js', $('#role-call-name').val(), function(er, err)
        {
            $('#role-call-name').val('');
            $('#role-call-response').html('Thanks for coming! Hope to see you next time!');
        });
    });
});