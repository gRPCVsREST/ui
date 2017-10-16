var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var config = require('./app/etc/config.json');

var forwardingUrls = {
    feed: "http://" + config.api.feed.host + ":" + config.api.feed.port,
    voting: "http://" + config.api.voting.host + ":" + config.api.voting.port,
    leaderboard: "http://" + config.api.leaderboard.host + ":" + config.api.leaderboard.port
};

var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

var server = express();

server.set('port', config.server.port);
server.use(express.static(__dirname + '/app'));

server.all("/content*", function(req, res) {
    apiProxy.web(req, res, {target: forwardingUrls.feed});
});

server.all("/vote/*", function(req, res) {
    apiProxy.web(req, res, {target: forwardingUrls.voting});
});

server.all("/leaderboard/*", function(req, res) {
    apiProxy.web(req, res, {target: forwardingUrls.leaderboard});
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.listen(server.get('port'), function() {
    console.log('Server listening on port ' + server.get('port'));
});