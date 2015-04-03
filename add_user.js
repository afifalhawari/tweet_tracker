var PersistUtils = require('./utils/PersistUtils');
var tracked_user = require('./data/tracked_user');

var index = tracked_user.indexOf(process.argv[2]);

if(index==-1){
	var user = createUser(process.argv[2]);
	tracked_user.push(process.argv[2]);
	PersistUtils.saveFile('./data/tracked_user.json',tracked_user);
	PersistUtils.saveFile('./data/'+process.argv[2]+'.json', user);
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