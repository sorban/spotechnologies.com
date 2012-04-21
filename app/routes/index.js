'use strict'

var util = require('util');
var User  = require('../schemas/User');

var titleProp = { title: 'SPO Technologies' };

module.exports = function(app) {

	app.get('/', function(req, res) {
	  res.render('index', titleProp )
	});

	app.get('/sportsStandings', function(req, res){
	  res.render('sportsStandings', { title: 'SPO Technologies', 
	  	teams: [{ name: 'NY', record: '1-10', pct: (1/11).toFixed(2), gb: 10 }, 
	  			{ name: 'BOS', record: '10-1', pct: (10/11).toFixed(2), gb: 0 }]
	})
	});

	app.get('/authFailed', function(req, res){
	  util.log('redirectING')
	  res.render('authFailed', titleProp)
	});

	/**
	    * Map the URL '/login' to the callback
	    */
	app.post('/login', function(req, res){
	  util.log('Serving request for url [POST] ' + req.route.path);
	  var username = req.body.User;
	  var password = req.body.Password;
	  
	  User.validateUser(username, password, function(err, user){
	  	util.log('err: ' + err + ' user: ' + user)
	    if(err && !user){
	      res.json({ message: 'unauthorized' })
	    }else{
	      res.json({
	        message : 'success',
	        user : user
	      });
	    }
	  });
	});


	app.get('/about', function(req, res){
	  res.render('about', titleProp)
	});

	app.get('/contact', function(req, res){
	  res.render('contact', titleProp)
	});

	app.get('/bootstrapIndex', function(req, res){
	  res.render('bootstrapIndex', titleProp)
	});

	app.get('/base-css', function(req, res){
	  res.render('base-css', titleProp)
	});

	app.get('/scaffolding', function(req, res){
	  res.render('scaffolding', titleProp)
	});

	app.get('/components', function(req, res){
	  res.render('components', titleProp)
	});

	app.get('/javascript', function(req, res){
	  res.render('javascript', titleProp)
	});

	app.get('/less', function(req, res){
	  res.render('less', titleProp)
	});

	app.get('/download', function(req, res){
	  res.render('download', titleProp)
	});

	app.get('/examples', function(req, res){
	  res.render('examples', titleProp)
	});
};