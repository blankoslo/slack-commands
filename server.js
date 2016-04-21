var restify = require('restify');
var fetch = require('node-fetch');

var server = restify.createServer();

server.use(restify.urlEncodedBodyParser({ mapParams : false }));

function shortswitch(url, alias){
    fetch('http://api.shortswitch.com/shorten',
        { method: 'POST', body: 'longUrl=' + url + '&apiKey=' + process.env.SHORTSWITCH_TOKEN })
	   .then(function(res) {

           console.log("jai");
		    return res.json();


	    }).then(function(json){
            console.log("ai");
            console.log(json);
	    });
}

//stupid stupid shortswitch api
function firstAttribute(obj) {
    for (var a in obj) return obj[a];
}

server.post('/shorten', (req, res) => {
    if(req.body.token == process.env.SLACK_TOKEN){
        fetch('http://api.shortswitch.com/shorten',
            { method: 'POST', headers: {'Accept':'application/json'}, body: 'apiKey=' + process.env.SHORTSWITCH_TOKEN +' +&longUrl=' + req.body.text })
    	   .then((shortswitchRes) => {
               shortswitchRes.json().then((jsonnn) => {
                   var shortBody = firstAttribute(jsonnn.results)
                   res.send({ 'response_type': 'in_channel', 'text': 'Ah yiss, du har kort URL! ('+shortBody.shortUrl+')',
                   'attachments': [{'text' : 'Den lange: ' + shortBody.longUrl} ] });
               })
           });
       }
    else {
        res.send(401, {error: 'Incorrect token.'});
    }
});


server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
