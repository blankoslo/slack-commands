var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());

server.post('/shorten', (req, res, next) => {

    if(req.body.token == process.env.SLACK_TOKEN){
        console.log(req.body.token);
        console.log(process.env.SLACK_TOKEN);
        res.send('nice');
    }
    else {
        res.send(401, {error: 'Incorrect token.'});
    }
    next();
});


server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
