var SaveUtils = require('./utils/SaveUtils');
var tracked_user = require('./data/tracked_user');

var index = tracked_user.indexOf(process.argv[2]);

if(index==-1){
	console.log('user '+process.argv[2]+' is not exists');
}else{
	tracked_user.splice(index);
	SaveUtils.saveFile('./data/tracked_user.json',tracked_user);
	console.log('user '+process.argv[2]+' successfully deleted');
}

function createUser(username){
	var user = {}
	user.username = username;
	user.favorite_list = [];
	user.tweet_list = [];
	user.following_list = [];
	user.last_tweet = null;
	return user;
}