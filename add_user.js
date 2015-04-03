var SaveUtils = require('./utils/SaveUtils');
var tracked_user = require('./data/tracked_user');

if(tracked_user.indexOf(process.argv[2])==-1){
	var user = createUser(process.argv[2]);
	tracked_user.push(process.argv[2]);
	SaveUtils.saveFile('./data/tracked_user.json',tracked_user);
	SaveUtils.saveFile('./data/'+process.argv[2]+'.json', user);
	console.log('user '+process.argv[2]+' successfully added');
}else{
	console.log('user '+process.argv[2]+' already exists');
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