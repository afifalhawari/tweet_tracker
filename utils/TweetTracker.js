var SaveUtils = require('./SaveUtils');
var tracked_user = require('./../data/tracked_user');

function trackTweet(client){
	for(var i=0;i<tracked_user.length;i++){
		var user = require('./../data/'+tracked_user[i]);
		if(i==tracked_user.length-1){
			getTweet(client,user,true);
		}else{
			getTweet(client,user,false);
		}
	}
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
		if(last){
			setTimeout(trackTweet(client),5000);	
		}	
	});
}

function processTweet(user,tweet){
	if(user.last_tweet<tweet.id){
		console.log(tweet.text);
		user.tweet_list.push(tweet);
	}
}

module.exports.trackTweet = trackTweet;