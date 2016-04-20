var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.post('/shorten', (req, res, next) => {

    if(req.params.token === process.env.SLACK_TOKEN) res.send('hello ' + req.params.token);
    else res.status(401)
});


server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
