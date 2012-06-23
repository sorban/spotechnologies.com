'use strict'

var util    = require('util');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

Array.prototype.getUnique = function() {
    var o = {}, a = []
    for (var i = 0; i < this.length; i++) o[this[i]] = 1
    for (var e in o) a.push(e)
    return a
}

var validatePresenceOf = function(value){
  return value && value.length; 
};

var toLower = function(string){
  return string.toLowerCase();
};

var SportsStandings = new Schema({
  'sport' : { type : String, 
              validate : [validatePresenceOf, 'a sport is required'],
              set : toLower
            },
  'league' : { type : String, 
              validate : [validatePresenceOf, 'a league is required'],
              set : toLower
            },
  'division' : { type : String, 
              validate : [validatePresenceOf, 'a division is required'],
              set : toLower
            },
  'teamName' : { type : String, 
              validate : [validatePresenceOf, 'a teamName is required'],
              set : toLower
            },
   'wins' : { type : Number, min: 0, 
              validate : [validatePresenceOf, 'wins is required'],
            },
   'losses' : { type : Number, min: 0, 
              validate : [validatePresenceOf, 'losses is required'],
            }
});

SportsStandings.index( { "sport" : 1, "league" : 1, "teamName" : 1 }, { unique: true } );

SportsStandings.statics.findTeamRecord = function(sport, league, 
                                                  division, teamName,
                                                  cb) {
  return  this.find({'sport' : sport, 'league' : league, 
                     'division' : division, 'teamName': teamName}, cb);
};

function Team(name, wins, losses) {
  this.name = name;
  this.wins = wins;
  this.losses = losses;
}

function Standing(sport, sportsStandings) {
  this.name = sport;
  
  //init the 3d array ??
  this.teams = {};
  var teams = this.teams;
  for(var i = 0; i < sportsStandings.length; i++) {

    var ss = sportsStandings[i],
        league = ss.league,
        division = ss.division,
        teamName = ss.teamName,
        wins = ss.wins,
        losses = ss.losses;

    if (!teams[league]) {
        teams[league] = {};
        teams[league][division] = [];
    } else if (!teams[league][division]) {
        teams[league][division] = [];
    }

    var newTeam = new Team(teamName, wins, losses);
    teams[league][division].push(newTeam);
  }
  console.log(this.teams);
}


SportsStandings.statics.findBySport = function(sport, cb) {
  this.find({'sport' : sport}, [], { sort: {league: 1} }, function(err, response) {
  
    if(!response) {
      cb(new Error('no records for: ' + sport), response);
  
    } else {
      var standing = new Standing(sport, response);
      console.log('STANDING: ' + standing.teams);
      cb(null, response);
    }

  });
};

module.exports = mongoose.model('SportsStandings' , SportsStandings);