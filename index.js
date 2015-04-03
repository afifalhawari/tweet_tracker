var Twitter = require('twitter');
var TweetTracker = require('./utils/TweetTracker');
var key = require('./config/key');

var client = new Twitter(key);

TweetTracker.trackTweet(client);