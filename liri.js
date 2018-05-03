require('dotenv').config({path:'./process.env'});

var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var command1 = process.argv[2];
var parameter = process.argv[3];
var params = {screen_name: 'kingdawk'};

// function returnTweets (){
//     console.log("tweet " + tweets.text + "Sent from: " + tweets.place.full_name);
// }

if (command1 === 'my-tweets'){

            client.get('statuses/user_timeline', params, function(error, data, response){
            // console.log(data);

            for (i = 0; i < data.length; i++) {
                var tweets = data[i];
                console.log(tweets.text);
                console.log(tweets.user.screen_name);
                
            }
        }
    )
};
if (command1 === 'spotify-this-song'){
    

}