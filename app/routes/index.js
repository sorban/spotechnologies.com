'use strict'

var util = require('util');
var User  = require('../schemas/User');
var SportsStandings = require('../schemas/SportsStandings');

var titleProp = { title: 'SPO Technologies' };

function teamDisplay(league, division, name, wins, losses) {
	this.league = league;
	this.division = division;
	this.teamName = name;
	this.record = String(wins + '-' + losses);
	this.pct = String((wins / (wins + losses)).toFixed(3)).slice(1);
}

module.exports = function(app) {

	app.get('/', function(req, res) {
	  res.render('index', titleProp )
	});

	app.get('/sportsStandings', function(req, res) {
		console.log('in sportsStandings');
		SportsStandings.findBySport('mlb', function(err, response) {
			//console.log('err: ' + err + 'response: ' + response);
			if(!err) {
				//console.log('object: ' + response + ' name: ' + response.teamName);
				var numTeams = response.length;
				var standings = new Array(numTeams);
				for(var i = 0; i < numTeams; i++) {
					standings[i] = new teamDisplay(response[i].league, response[i].division, 
											   response[i].teamName, response[i].wins, 
											   response[i].losses);
					//console.log('one item: ' + standings[i]);
				}
				//console.log(standings);
	  			res.render('sportsStandings', { title: 'SPO Technologies', standings: standings });
	  		}
		});
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