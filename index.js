var Twitter = require('twitter');
var TweetTracker = require('./utils/TweetTracker');
var key = require('./config/key');
var tracked_user = require('./data/tracked_user');

var client = new Twitter(key);

for(var i=0;i<tracked_user.length;i++){
	TweetTracker.trackTweet(client, tracked_user[i]);
}