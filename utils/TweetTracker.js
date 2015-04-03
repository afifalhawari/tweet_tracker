var SaveUtils = require('./SaveUtils');

function trackTweet(client, username){
	var user = require('./../data/'+username);
	getTweet(client,user)
}

function getTweet(client,user,last){
	client.get('statuses/user_timeline', {'screen_name' : user.username, 'since_id' : user.last_tweet+1, 'count' : 5 }, function(error,tweets,response){
		if(!error){
			for(var j=0;j<tweets.length;j++){
				processTweet(user,tweets[j]);			
			}
			if(tweets.length>0){
				user.last_tweet = tweets[0].id;
			}
			SaveUtils.saveFile('./data/'+user.username+'.json',user);
		}
		setTimeout(trackTweet(client,user.username),5000);		
	});
}

function processTweet(user,tweet){
	if(user.last_tweet<tweet.id){
		console.log(tweet.text);
		user.tweet_list.push(tweet);
	}
}

module.exports.trackTweet = trackTweet;