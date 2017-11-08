// run with: sudo node server.js
//var gpio = require('rpi-gpio');
'use strict';
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');

// create a mqtt client
const client = mqtt.connect();
// Use the www folder
app.use(express.static(__dirname + '/www'));


// Starts Socket.io server
io.on('connection', function(socket){
		console.log('a user connected');
		// All leds work with these set of functions (?)

		socket.on('status', function(msg){
				console.log("onoff: " + msg.onoff);
				client.publish("mqtt/"+msg.id.toString()+"/status", msg.onoff.toString());
				});
		socket.on('color', function(msg){
				console.log("color: " + msg.color);
				client.publish("mqtt/"+msg.id.toString()+"/color", msg.color.toString());
				});
		socket.on('saturation', function(msg){
				console.log("saturation: " + msg.saturation);
				client.publish("mqtt/"+msg.id.toString()+"/saturation", msg.saturation.toString());
				});
		socket.on('brightness', function(msg){
				console.log("brightness: " + msg.brightness);
				client.publish("mqtt/"+msg.id.toString()+"/brightness", msg.brightness.toString());
				});
		socket.on('rainbow', function(msg){
				console.log("rainbow: " + msg.rainbow);
				//client.publish("mqtt/"+msg.id.toString()+"/rainbow", msg.rainbow.toString());
				client.publish("mqtt/"+msg.id.toString()+"/status", (msg.rainbow+2).toString());
				});
		socket.on('speed', function(msg){
				console.log("speed: " + msg.speed);
				client.publish("mqtt/"+msg.id.toString()+"/speed", msg.speed.toString());
				});

});
// Starts HTTP server that shows the app
var port = 8000;
http.listen(port, function(){
		console.log('listening on *:'+port);
		});


