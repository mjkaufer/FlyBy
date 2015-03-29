var fs = require('fs');
var Twit = require('twit')
var T = new Twit({
	consumer_key:'GuBgzAP8T886huUdQiAANQecA',
	consumer_secret:'Cfc5MgDH77FrnZnfl0P8NlviymoJZLbh4iu0eSxPZMUfSYcBUg',
	access_token:'3126546177-aVMBQlTF27kFuDCaJDEfe0yjIyxtE7wu5cEAMDx',
	access_token_secret:  'CHaoksEHCYYTxSqhzGEk9Y7Trby1EJY1scoeFIOiHiOaF'
})

function tweetImage(path, text){
	//
	// post a tweet with media
	//
	var b64content = fs.readFileSync(path, { encoding: 'base64' })

	// first we must post the media to Twitter
	T.post('media/upload', { media: b64content }, function (err, data, response) {

	  // now we can reference the media and post a tweet (media will attach to the tweet)
	  var mediaIdStr = data.media_id_string
	  var params = { status: text, media_ids: [mediaIdStr] }

	  T.post('statuses/update', params, function (err, data, response) {
	    console.log(data)
	    fs.unlink(path, function(err){
	    	console.log("Successfully tweeted and deleted")
	    })
	  })
	})
}


fs.readdir('./images/', function(err, files){
	if(err){
		console.log("It broke...");
		return;
	}

	for(var i = 0; i < files.length; i++){
		var imageName = files[i];//todo, remove image after we upload successfully
		//windows file appending
		var date = "unknown date";
		try{
			var time = imageName.substr(0, imageName.length - 4);
			date = new Date(parseInt(time)).toGMTString();
		} catch(e){

		}


		tweetImage(__dirname + "\\images\\" + imageName, "Image taken at " + date);
	}

})