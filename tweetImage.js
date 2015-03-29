var fs = require('fs');
var Twit = require('twit')
var T = new Twit({
	consumer_key:'sI4d8txZhBSGVglIszipe6R7Z',
	consumer_secret:'9kcvNWBYfFwAsJ44vkUDBZvSzPqgyaQQ2NeDlv6xHOtVj6sOQK',
	access_token:'3124837948-2X2CkqHhwAJ67B9AdBok4nN1Y3XXB7todqwaZWW',
	access_token_secret:  'ztPOLjti9E0UWn2NQBxr2DdYjXc8CknNpjBeA15pivrBR'
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