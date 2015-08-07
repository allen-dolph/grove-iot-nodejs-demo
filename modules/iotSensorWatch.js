var B = 3975
    , mraa = require("mraa")
    , groveSensor = require('jsupm_grove')
    , lcd = require('jsupm_i2clcd')
    , sensorApi = require('./sensorApiWrapper');

/* 
 * Example of connection to Grove temp sensor with jsupm_grove wrapper
 */
// Create the temperature sensor object using AIO pin 0
var tempSensor = new groveSensor.GroveTemp(2);
console.log(tempSensor.name());

/*
 * Exmaple of connection to GROVE pin using mraa
 */
// GROVE Kit A0 Connector --> Aio(0)
//var myAnalogPin = new mraa.Aio(0);

/*
 * Example of how to outpu to the grove 2-line lcd displan
 */
//var lcdDisplay = new lcd.Jhd1313m1(0); //, 0x3E, 0x62);  
//lcdDisplay.setColor(64,255,64);
//lcdDisplay.home();
//lcdDisplay.write("Node Sensor Watch")
//lcdDisplay.setCursor(1,0);
//lcdDisplay.write("Initializing...");

/*
 * Function: readTemp
 * Description: Read the temperature from the grove sensor and returns it
 * Returns: and object containing both the celsius and farienheight temps
 */
var readSensor = function() {
	console.log('Reading Sensor...');

	/*
	 * Example of how to read the temperature sensor data with both
	 * mraa and the jsupm_grove wrapper
     */
    //var a = myAnalogPin.read();
    //console.log("Analog Pin (A0) Output: " + a);
    //console.log("Checking....");

    //var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
    //console.log("Resistance: "+resistance);
    
    //var celsiusTemperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
    //var cTemp = tempSensor.value();
    //console.log("Celsius Temperature " + cTemp); 
    
    //var fTemp = (cTemp * (9 / 5)) + 32;
    //console.log("Fahrenheit Temperature: " + fTemp);

    var d = {
        sensor : 'sensor',
        value : 'sensorValue'
    };

    return d; 
}

var updateDisplay = function(data) {
	// now update the display
    //lcdDisplay.clear();
    //lcdDisplay.home();
    //lcdDisplay.write(JSON.stringify(data));
}

module.exports = {
	 
	/*
	 * Function: startTemperatureDisplay
	 * Description: continually updates the lcd with the temperature
	 */
	startSensorDisplay : function() {
	    'use strict';
	    var data = readSensor);
        console.log("Current Sensor Reading: " + data);

        updateDisplay(data);

	    console.log("Starting Sensor LCD display updates");
	    var updater = setInterval(function() {
	        var data = readTemp();
	        console.log("Current Sensor Reading: " + data);

	        updateDisplay(data);       

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

	        if(socket.readyState == "open") {
	            socket.write(JSON.stringify(data));
	        } else {
	            clearInterval(sender);
	        }
	    }, 4000);
	}

}