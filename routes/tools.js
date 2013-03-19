
/*
 * GET tools listing.
 */

var tools = {
  'ping': {
    'description': 'ping address',
    'command': 'ping',
    'args': [],
    'default': '127.0.0.1'
  },
  'ls': {
    'description': 'list files',
    'command': 'ls',
    'args': [],
    'default': ''
  },
  'python': {
    'description': 'python',
    'command': 'python',
    'args': [],
    'default': '-V'
  }
};

exports.tools = tools;

exports.list = function(req, res){
  res.send(tools);
};

exports.get = function(req, res){
  res.send(tools[req.params.toolname]);
};