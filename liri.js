require('dotenv').config({ path: './process.env' });

var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require("request");
var fs = require('fs');
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);
var command1 = process.argv[2];
var parameter = process.argv[3];

for (let i = 3; i < process.argv.length; i++) {
    var multiString = process.argv[i];
}
function tweetProgram() {
    var params = { screen_name: 'kingdawk' };
    if (command1 === 'my-tweets') {
        client.get('statuses/user_timeline', params, function (error, data, response) {
            for (i = 0; i < data.length; i++) {
                var tweets = data[i];
                console.log(tweets.text);
                console.log(tweets.user.screen_name);
            }
        }
        )
    };
}
function spotifyProgram() {
    if (command1 === 'spotify-this-song') {
        spotify.search({ type: 'track', query: multiString, limit: 1 })
            .then(function (response) {
                console.log("Artist name: " + response.tracks.items[0].artists[0].name);
                console.log("Song name: " + response.tracks.items[0].name);
                console.log("Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("Album: " + response.tracks.items[0].album.name);

            })
    };
}
function omdbProgram() {
    if (command1 === 'movie-this') {
        var queryURL = 'http://www.omdbapi.com/?t=' + multiString + "&y=&plot=short&apikey=75ee92b9"
        request(queryURL, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country where movie was produced: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    };
}
function doWhatItSays() {
    if (command1 === 'do-what-it-says') {
        fs.readFile('random.txt', "utf8", function (err, data) {
            var splitData = (data.split(','));
            command1 = splitData[0];
            multiString = splitData[1];
            if (command1 === 'spotify-this-song') {
                spotifyProgram();
            }
            if (command1 === 'movie-this') {
                omdbProgram();
            }
            if (command1 === 'my-tweets') {
                tweetProgram();
            }
        })
    }
}
if (multiString === undefined && command1 === 'movie-this') {
    multiString = "Mr. Nobody";
}
if (multiString === undefined && command1 === 'spotify-this-song') {
    multiString = "Ace of Base";
}

tweetProgram();
spotifyProgram();
omdbProgram();
doWhatItSays();