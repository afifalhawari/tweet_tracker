var Twitter = require('twitter');
var fs = require('fs');

var key = require('./config/key');
var tracked_user = require('./config/tracked_user');

var client = new Twitter(key);

trackTweet();

function trackTweet(){
	for(var i=0;i<tracked_user.length;i++){
		if(i==tracked_user.length-1){
			getTweet(tracked_user[i],true);
		}else{
			getTweet(tracked_user[i],false);	
		}
	}
}

function getTweet(tracked_user, last){
	client.get('statuses/user_timeline', {'screen_name' : tracked_user.username, 'since_id' : tracked_user.since_id+1, 'count' : 5 }, function(error,tweets,response){
		if(!error){
			console.log(tracked_user);
			for(var j=0;j<tweets.length;j++){
				processTweet(tracked_user,tweets[j]);			
			}
			if(tweets.length>0){
				tracked_user.since_id = tweets[0].id;
			}
		}
		if(last){
			saveFile();	
			setTimeout(trackTweet,5000);	
		}	
	});
}

function processTweet(tracked_user,tweet){
	if(tracked_user.since_id<=tweet.id){
		console.log(tweet.text);
		tracked_user.tracked_tweet_id.push(tweet.id); 
	}
}

function saveFile(){
	var output = './config/tracked_user.json';
	fs.writeFile(output, JSON.stringify(tracked_user), function(err) {
		if(err) {
			console.log(err);
		} else {
		    console.log("JSON saved to " + output);
		}
	}); 
}