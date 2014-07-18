var five = require("johnny-five"),
    keypress = require("keypress"),
    board;

// Generate keypress process
keypress(process.stdin);
// Wake borad
board = new five.Board();
// Angle
var angle = 90;

// Main func
board.on("ready", function() {
  console.log("Let's test a simple servo. Use Up and Down arrows for CW and CCW respectively. Space to stop.");

  // LED on arduino
  var led = new five.Led( {
    pin: 13
  });
  led.strobe(200);
    
  // LED on out
  var outLed = new five.Led( {
    pin: 8
  });
  outLed.strobe(500);
  
  // Camera servo
  var servo = new five.Servo({
    pin: "10",
    type: "continuous"
  }).stop();

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function(ch, key) {
    if (!key) {
      return;
    }

    if (key.name === "q") {
      console.log("Quitting");
      process.exit();
    }
    else if (key.name === "up") {
      console.log("CW");
      //servo.cw();
      angle+=20;
      if( angle > 180 ) angle = 180;
      servo.to(angle);
    }
    else if (key.name === "down") {
      console.log("CCW");
      //servo.ccw();
      angle-=20;
      if( angle < 0 ) angle = 0;
      servo.to(angle);
    }
    else if (key.name === "space") {
      console.log("Stopping");
      servo.stop();
    }
  });
});
