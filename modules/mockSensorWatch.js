var sensorApi = require('./sensorApiWrapper');

/* 
 * Helper function to give a random number
 * (used for the mock temperature value)
 */
function random (low, high) {
    return Math.random() * (high - low) + low;
}

/*
 * Function: startTemperatureDisplay
 * Description: continually updates the lcd with the temperature
 */
var readSensor = function() {
	console.log('Reading Sesnsor...');
	    
	    //var celsiusTemperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
	    //var cTemp = random(6, 20);
	    //console.log("Celsius Temperature " + cTemp); 
	    
	    //var fTemp = (cTemp * (9 / 5)) + 32;
	    //console.log("Fahrenheit Temperature: " + fTemp);

	    var d = {
	        sensor : 'sensor1',
	        value : '10'
	    };
			    
	    return d; 
}

module.exports = {
	 
	/*
	 * Function: startTemperatureDisplay
	 * Description: continually updates the lcd with the temperature
	 */
	startSensorDisplay : function(deviceSerialNumber) {
	    'use strict';
	    console.log("Starting Temp Sensor LCD display updates");
	    var updater = setInterval(function() {
	        var data = readSensor();
	        console.log("Current Sensor Value: " + data.value);

	        // now update the display
	        console.log("DISPLAY:: Sensor: " + data.sensor + "  Value: " + data.value);

	        // also post to the temperature backend
	        //var temperatureObj = {
	        //	celciusTemperature : data.celsius,
	        //	fahrenheitTemperature: data.fahrenheit,
	        //	deviceSerialNumber: deviceSerialNumber,
	        //	unixTimestamp: Math.floor(Date.now() / 1000)
	        //};

	        // set content-type header and data as json in args parameter 
			var args = {
			  data: {},
			  headers:{"Content-Type": "application/json"} 
			};

			/*
			 * Example to post to a google cloud endpoints backend
			 */
	        //sensorApi.client.methods.postMethodName(args, function(data,response){
			//    // parsed response body as js object 
			//    console.log(data.toString('utf-8'));
			//    // raw response 
			//    //console.log(response);
			//});
	    }, 1000);
	},
	/*	
	 * Function: startSensorWatch(socket)
	 * Parameters: socket - client communication channel
	 * Description: Read Temperature Sensor and send temperature in degrees of Fahrenheit every 4 seconds
	*/
	startSensorWatch : function(socket) {
	    'use strict';
	    console.log("Starting Sensor Watch for socket: " + socket.name);
	    var sender = setInterval(function () {
	        var data = readSensor();
	        console.log(socket.readyState);
	        
	        if(socket.readyState == "open") {
	            socket.write(JSON.stringify(data));
	        } else {
	            clearInterval(sender);
	        }
	    }, 2000);
	}

}
