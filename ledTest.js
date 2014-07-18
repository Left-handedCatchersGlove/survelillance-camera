var j5 = require('johnny-five');
arduino = new j5.Board();

arduino.on('ready', function() {
  var led = new j5.Led( {
    pin: 13
  });
  led.strobe(200);
  
  var outLed = new j5.Led( {
    pin: 8
  });
  outLed.strobe(500);
});
