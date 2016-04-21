var restify = require('restify');
var fetch = require('node-fetch');

var server = restify.createServer();

server.use(restify.urlEncodedBodyParser({ mapParams : false }));

//stupid stupid shortswitch api
function firstAttribute(obj) {
    for (var a in obj) return obj[a];
}

server.post('/shorten', (req, res) => {
    if(req.body.token == process.env.SLACK_TOKEN){
        var textArray = req.body.text.split(' ');
        var reqBody = 'apiKey=' + process.env.SHORTSWITCH_TOKEN +' +&longUrl=' + textArray[0];
        if(textArray.length > 1) reqBody += '&token=' + textArray[1];
        fetch('http://api.shortswitch.com/shorten',
            { method: 'POST', headers: {'Accept':'application/json'}, body: reqBody})
    	   .then((shortswitchRes) => {
               shortswitchRes.json().then((jsonnn) => {
                   var shortBody = firstAttribute(jsonnn.results)
                   res.send({ 'response_type': 'in_channel', 'text': 'Ah yiss, du har kort URL! ('+shortBody.shortUrl+')',
                   'attachments': [{'text' : 'Den lange: ' + shortBody.longUrl} ] });
               })
           }).catch((ex) => {
               console.error('Error: ', ex)
               res.send(500, {error: 'From shortswitch: ' + ex});
           });
       }
    else {
        res.send(401, {error: 'Incorrect token.'});
    }
});

server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
