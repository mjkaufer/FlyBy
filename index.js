var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeOff();

var currentImage = null;

var frequency = 60;//pictures per hour
var save = false;

var pngStream = client.getPngStream();

pngStream.on('data', function(img){
	if(save == true){
		//save the picture
		save = false;
	}

});

setInterval(function(){
	save = true;
}, 3600 * 1000 / frequency);

