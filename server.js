// run with: node server.js
//var gpio = require('rpi-gpio');
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');

// create a mqtt client
const client = mqtt.connect();
// Use the www folder
app.use(express.static('www'));

// Starts Socket.io server
io.on('connection', function(socket){
		console.log('a user connected');
		// Led 1
		socket.on('rgbw', function(msg){
				console.log("id: "+ msg.id);
				console.log("onoff: "+msg.onoff);
				console.log("brightness: "+msg.brightness);
				console.log("saturation: "+msg.saturation);
				console.log("color: "+ msg.color);
				client.publish("rgbw/"+msg.id.toString(), msg.onoff+":"+msg.brightness+":"+msg.saturation+":"+msg.color);
				});
});
// Starts HTTP server that shows the app
var port = 8000;
http.listen(port, function(){
		console.log('listening on *:'+port);
		});

