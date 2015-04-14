var PersistUtils = require('./PersistUtils');

function trackTweet(client, username){
	var user = PersistUtils.loadUser(username);
	getTweet(client,user);
}

function getTweet(client,user){
	client.get('statuses/user_timeline', {'screen_name' : user.username, 'since_id' : user.last_tweet+1, 'count' : 5 }, function(error,tweets,response){
		if(!error){
			for(var j=0;j<tweets.length;j++){
				processTweet(user,tweets[j]);			
			}
			if(tweets.length>0){
				user.last_tweet = tweets[0].id;
			}
			PersistUtils.saveFile('./data/'+user.username+'.json',user);
		}
		setTimeout(trackTweet(client,user.username),5000);		
	});
}

function processTweet(user,tweet){
	if(user.last_tweet<tweet.id){
		processTweeting(user,tweet);
		processMentioning(user,tweet);
		processUrls(user,tweet);
		user.tweet_list.push(tweet);
	}
}

function processTweeting(user,tweet){
	console.log('@'+user.username+' tweeted : '+tweet.text);
}

function processMentioning(user,tweet){
	if(tweet.entities.user_mentions.length>0){
		var user_mentions = tweet.entities.user_mentions;
		var user_mentions_list = '';
		for(var i=0;i<user_mentions.length;i++){
			user_mentions_list+='@'+user_mentions[i].screen_name+' ';
		}
		console.log('@'+user.username+' mentioned : '+user_mentions_list);
	}
}

function processUrls(user,tweet){
	if(tweet.entities.urls.length>0){
		//TODO : implement url processing
	}
}

module.exports.trackTweet = trackTweet;
