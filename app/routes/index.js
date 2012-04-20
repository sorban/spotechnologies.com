
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'SPO Technologies', headerActive: '' })
};

exports.sportsStandings = function(req, res){
  res.render('sportsStandings', { title: 'Sports Standings', headerActive: 'sportsStandings' })
};

exports.about = function(req, res){
  res.render('about', { title: 'SPO Technologies', headerActive: 'about' })
};

exports.contact = function(req, res){
  res.render('contact', { title: 'SPO Technologies', headerActive: 'contact' })
};

exports.bootstrapIndex = function(req, res){
  res.render('bootstrapIndex', { title: 'SPO Technologies', headerActive: 'bootstrapIndex' })
};