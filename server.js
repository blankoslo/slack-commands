var restify = require('restify');

var server = restify.createServer();
server.post('/shorten', (req, res, next) => {

    if(req.params.token === process.env.SLACK_TOKEN){
        res.send('yolo');
    }
    else {
        res.status(401);
    }
    next();
});


server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
