var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeOff();

var currentImage = null;

var frequency = 120;//pictures per hour
var save = false;

var pngStream = client.getPngStream();

pngStream.on('data', function(img){
	if(save == true){
		//save the picture
		var name = new Date().getTime();

		require("fs").writeFile("images/" + name + ".png", img, 'base64', function(err) {
			console.log(err);
		});
		console.log("Snap");
		save = false;

		//send twitter by reading from name.jpg

	}

});

setInterval(function(){
	save = true;
}, 3600 * 1000 / frequency);
