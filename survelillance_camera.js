// Server side
var io = require('socket.io').listen(3000);

// Arduino
var five = require("johnny-five"),
    keypress = require("keypress"),
    board;

// Generate keypress process
keypress(process.stdin);
// Wake borad
board = new five.Board();
// Angle
var angle = 90;

var servo;

// Main func
board.on("ready", function() {
  console.log("Arduino connected");

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
  servo = new five.Servo({
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
      console.log("Left");
      //servo.cw();
      angle += 20;
      if( angle > 180 ) angle = 180;
      servo.to(angle);
    }
    else if (key.name === "down") {
      console.log("Right");
      //servo.ccw();
      angle -= 20;
      if( angle < 0 ) angle = 0;
      servo.to(angle);
    }
    else if (key.name === "space") {
      console.log("Stopping");
      servo.stop();
    }
  });
});

// Stream socketIO
io.sockets.on('connection', function (socket) {
  // Broadcast
  socket.on('video', function (data) {
    socket.broadcast.emit('video', data);
  });

	// Trun right
	socket.on('right', function (move) {
		angle += move;
    if( angle > 180 ) angle = 180;
    servo.to(angle);
		console.log("Right");
	});

	// Trun left
	socket.on('left', function (move) {
		angle += move;
    if( angle < 0 ) angle = 0;
    servo.to(angle);
		console.log("Left");
	});
});