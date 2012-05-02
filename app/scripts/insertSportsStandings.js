'use strict'

var util = require('util');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/spotechnologiesdb');
var SportsStandings  = require('../schemas/SportsStandings');

var MLBteams = [ { league: "AL", division: "east", name: "New York Yankees" },
                 { league: "AL", division: "east", name: "Boston Red Sox" },
                 { league: "AL", division: "east", name: "Tampa Bay Rays" },
                 { league: "AL", division: "east", name: "Baltimore Orioles" },
                 { league: "AL", division: "east", name: "Toronto Blue Jays" },

                 { league: "AL", division: "central", name: "Cleveland Indians" },
                 { league: "AL", division: "central", name: "Chicago White Sox" },
                 { league: "AL", division: "central", name: "Detroit Tigers" },
                 { league: "AL", division: "central", name: "Kansas City Royals" },
                 { league: "AL", division: "central", name: "Minnesota Twins" },

                 { league: "AL", division: "west", name: "Texas Rangers" },
                 { league: "AL", division: "west", name: "Oakland Athletics" },
                 { league: "AL", division: "west", name: "Seattle Mariners" },
                 { league: "AL", division: "west", name: "Los Angeles Angels" },

                 { league: "NL", division: "east", name: "Atlanta Braves" },
                 { league: "NL", division: "east", name: "Washington Nationals" },
                 { league: "NL", division: "east", name: "New York Mets" },
                 { league: "NL", division: "east", name: "Philadelphia Phillies" },
                 { league: "NL", division: "east", name: "Miami Marlins" },
                 
                 { league: "NL", division: "central", name: "St Louis Cardinals" },
                 { league: "NL", division: "central", name: "Cincinnati Reds" },
                 { league: "NL", division: "central", name: "Milwaukee Brewers" },
                 { league: "NL", division: "central", name: "Pittsburgh Pirates" },
                 { league: "NL", division: "central", name: "Chicago Cubs" },
                 { league: "NL", division: "central", name: "Houston Astros" },

                 { league: "NL", division: "west", name: "Los Angeles Dodgers" },
                 { league: "NL", division: "west", name: "San Francisco Giants" },
                 { league: "NL", division: "west", name: "Arizona Diamondbacks" },
                 { league: "NL", division: "west", name: "Colorado Rockies" },
                 { league: "NL", division: "west", name: "San Diego Padres" }

                 
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
    if(!err) {
      SportsStandings.find(function(err, arr) {
        console.log(arr);
        console.log('length='+arr.length);
        //process.exit();
      });
    }
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

