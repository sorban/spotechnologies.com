'use strict'

var util = require('util');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/spotechnologiesdb');
var SportsStandings  = require('../schemas/SportsStandings');

var MLBteams = [ { league: "AL", division: "east", name: "New York Yankees" },
                 { league: "AL", division: "east", name: "Boston Red Sox" },
                 { league: "AL", division: "east", name: "Tampa Bay Rays" },
                 { league: "AL", division: "east", name: "Baltimore Orioles" },
                 { league: "AL", division: "east", name: "Toronto Blue Jays" }
               ];

var numTeams = MLBteams.length;
for (var i = 0; i < numTeams; i++) {
  var record = new SportsStandings();
  record.sport = 'mlb';
  record.league = MLBteams[i].league;
  record.division = MLBteams[i].division;
  record.teamName = MLBteams[i].name;
  var wins = Math.floor(Math.random()*163);
  record.wins = wins;
  record.losses = 162 - wins;

  record.save(function(err) {
    console.log('error: ' + err);
    SportsStandings.find(function(err, arr) {
      console.log(arr);
      console.log('length='+arr.length);
      //process.exit();
    });
  });
  
}

/*
var record = new SportsStandings({ 
          'sport' : 'mlb',
          'league' : 'AL',
          'divison' : 'east',
          'teamName' : 'New York Yankees',
          'wins' : 10,
          'losses' : 1});
*/
