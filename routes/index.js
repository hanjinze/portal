
/*
 * GET home page.
 */
var tools = require('./tools').tools;

exports.index = function(req, res){
  res.render('index', { title: 'Portal', tools: tools });
};