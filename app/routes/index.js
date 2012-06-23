'use strict'

var util = require('util');
var User  = require('../schemas/User');
var SportsStandings = require('../schemas/SportsStandings');
var FacebookClient = require("facebook-client").FacebookClient;

var facebook_client = new FacebookClient(
    "353022608104506", // configure like your fb app page states
    "ac33a5fedb2ab3cc051e0bcceaf2f982", // configure like your fb app page states
    {
        "timeout": 10000 // modify the global timeout for facebook calls (Default: 10000)
    }
);

function teamDisplay(name, wins, losses) {
	this.teamName = name;
	this.record = String(wins + '-' + losses);
	this.pct = String('.' + (wins / (wins + losses)).toFixed(3) * 1000);
}

module.exports = function(app) {

	app.get('/', function(req, res) {
	  res.render('index' )
	});

	app.get('/sportsStandings', function(req, res) {
		console.log('in sportsStandings');
		SportsStandings.findBySport('mlb', function(err, sportsStandings) {
			console.log('err: ' + err + 'sportsStandings: ' + sportsStandings);
			if(!err) {
				console.log('object: ' + sportsStandings + ' name: ' + sportsStandings.teamName);
				var numTeams = sportsStandings.length;
				var teams = new Array(numTeams);
				for(var i = 0; i < numTeams; i++) {
					teams[i] = new teamDisplay(sportsStandings[i].teamName, sportsStandings[i].wins, sportsStandings[i].losses);
					console.log('one item: ' + teams[i]);
				}
				console.log(teams);
	  			res.render('sportsStandings', { teams: teams });
	  		}
		});
	});

	app.get('/authFailed', function(req, res){
	  util.log('redirectING')
	  res.render('authFailed')
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

	app.post('/social', function(req, res) {
 		util.log('Serving request for url [POST] ' + req.route.path);

 		//insert facebook send button here
 		facebook_client.getSessionByRequestHeaders(req.headers)(function(facebook_session) {
    	facebook_session.graphCall("/me", {
    	})(function(result) {
        console.log('Username is:' + result.name);
    	});
    	facebook_session.graphCall("/me/feed", {message:"I love node.js!"}, 'POST')(function(result) {
        console.log('The new feed post id is: ' + result.id);
    	});
    	res.json({ message : 'received'});
		});
	});

	app.get('/social', function(req, res){
	  res.render('social')
	});

	app.get('/about', function(req, res){
	  res.render('about')
	});

	app.get('/contact', function(req, res){
	  res.render('contact')
	});

	app.get('/bootstrapIndex', function(req, res){
	  res.render('bootstrapIndex')
	});

	app.get('/base-css', function(req, res){
	  res.render('base-css')
	});

	app.get('/scaffolding', function(req, res){
	  res.render('scaffolding')
	});

	app.get('/components', function(req, res){
	  res.render('components')
	});

	app.get('/javascript', function(req, res){
	  res.render('javascript')
	});

	app.get('/less', function(req, res){
	  res.render('less')
	});

	app.get('/download', function(req, res){
	  res.render('download')
	});

	app.get('/examples', function(req, res){
	  res.render('examples')
	});
};