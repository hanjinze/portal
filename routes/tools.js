
/*
 * GET tools listing.
 */

var tools = {
  'ping': {
    'name': 'ping',
    'command': 'ping',
    'args': [],
    'default': '127.0.0.1'
  },
  'ls': {
    'name': 'ls',
    'command': 'ls',
    'args': [],
    'default': ''
  }
};

exports.tools = tools;

exports.list = function(req, res){
  res.send(tools);
};

exports.get = function(req, res){
  res.send(tools[req.params.toolname]);
};

exports.run = function(req, res){
  res.send('run: ' + req.params.toolname);
};