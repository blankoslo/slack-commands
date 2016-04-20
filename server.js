var restify = require('restify');

var server = restify.createServer();
server.post('/shorten', (req, res, next) => {

    if(req.params.token == process.env.SLACK_TOKEN){
        console.log(req.params.token);
        console.log(process.env.SLACK_TOKEN);
    }
    else {
        res.send(401, {error: 'Incorrect token.'});
    }
    next();
});


server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
