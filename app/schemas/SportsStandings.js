'use strict'

var util    = require('util');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

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

SportsStandings.statics.findTeamRecord = function(sport, league, 
                                                  division, teamName,
                                              cb) {
  return  this.find({'sport' : sport, 'league' : league, 
                     'division' : division, 'teamName': teamName}, cb);
};

SportsStandings.statics.findBySport = function(sport, cb) {
  this.find({'sport' : sport}, function(err, response) {
    var sportsStandings = response;
    if(!sportsStandings) {
      util.log('no records for: ' + sport);
      cb(new Error('no records for: ' + sport), sportsStandings);
    } else {
      util.log('sport: ' + sport + ' found: ' + sportsStandings);
      cb(null, sportsStandings);
    }});
};

module.exports = mongoose.model('SportsStandings' , SportsStandings);
