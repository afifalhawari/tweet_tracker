var tracked_user = require('./../config/tracked_user');

function trackTweet(client){
	for(var i=0;i<tracked_user.length;i++){
		if(i==tracked_user.length-1){
			getTweet(client,tracked_user[i],true);
		}else{
			getTweet(client,tracked_user[i],false);	
		}
	}
}

function getTweet(client,tracked_user, last){
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
			setTimeout(trackTweet(client),5000);	
		}	
	});
}

function processTweet(tracked_user,tweet){
	if(tracked_user.since_id<=tweet.id){
		console.log(tweet.text);
		tracked_user.tracked_tweet_id.push(tweet.id); 
	}
}

module.exports.trackTweet = trackTweet;