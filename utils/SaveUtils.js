var fs = require('fs');

function saveFile(filename, contents){
	fs.writeFile(filename, JSON.stringify(contents), function(err) {
		if(err) {
			console.log(err);
		} else {
		    //console.log("JSON saved to " + output);
		}
	}); 
}

module.exports.saveFile = saveFile;