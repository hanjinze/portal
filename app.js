
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , tools = require('./routes/tools')
  , http = require('http')
  , path = require('path')
  , spawn = require('child_process').spawn;

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('tomo'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        app[key](route, a[key]);
        break;
    }
  }
};

app.map({
  '/': {
    get: routes.index
  },
  '/tools': {
    get: tools.list,
    '/:toolname': {
      get: tools.get,
      post: tools.run
    }
  }
});

io.sockets.on('connection', function(socket){
  socket.on('run', function(data){
    console.log(data);
    var args = data.args ? data.args.split(/\s+/) : []
      , cmd = spawn(data.name, args);
    socket.on('abort', function(data){
      cmd.kill();
    });
    cmd.stdout.on('data', function(data){
      socket.emit('msg', '' + data);
    });
    cmd.stderr.on('data', function(data){
      socket.emit('error', '' + data);
    });
  });
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
