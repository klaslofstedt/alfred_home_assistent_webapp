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

var num_rgbw = 3;

class rgbw{
	constructor(id){
		this.id = id;
		this.onoff = 0;
		this.heartbeat = false;
		this.color = 0;
		this.saturation = 0;
		this.brightness = 0;
		this.rainbow = 0;
		this.speed = 0;
	}
}

class plug{
	constructor(id){
		this.id = id;
		this.onoff = 0;
		this.heartbeat = 0;
	}
}


var device_rgbw = new Array();
for(var i = 0; i < num_rgbw; i++){
	device_rgbw[i] = new rgbw(i);
}


client.on('connect', function(){
		client.subscribe('rgbw/+/heartbeat');
		client.subscribe('plug/+/heartbeat');
		})

// Subscripe to the heartbeat topics of each esp8266
client.on('message', function(topic, message){
		console.log(topic.toString());
		console.log(message.toString());
		if((topic.toString().includes("rgbw")) && (topic.toString().includes("heartbeat"))){
		var id = 0;
		while(!topic.toString().includes(id.toString())){
		id++;
		}
		device_rgbw[id].heartbeat = true;
		}
		else if(topic.toString().includes("plug")){
		console.log("plug!");
		}
		})


// Send new data to each esp8266 that didn't send a heartbeat within every 10 seconds
/*setInterval(function(){
		for(var i = 0; i < num_rgbw; i++){
		if(device_rgbw[i].heartbeat == false){
		console.log("lost heartbeat, publishing new data");

		console.log("rgbw/"+i.toString()+"/color", device_rgbw[i].color.toString());
		client.publish("rgbw/"+i.toString()+"/color", device_rgbw[i].color.toString());
		console.log("rgbw/"+i.toString()+"/saturation", device_rgbw[i].saturation.toString());
		client.publish("rgbw/"+i.toString()+"/saturation", device_rgbw[i].saturation.toString());
		console.log("rgbw/"+i.toString()+"/brightness", device_rgbw[i].brightness.toString());
		client.publish("rgbw/"+i.toString()+"/brightness", device_rgbw[i].brightness.toString());
		console.log("rgbw/"+i.toString()+"/status", device_rgbw[i].onoff.toString());
		client.publish("rgbw/"+i.toString()+"/status", device_rgbw[i].onoff.toString());
		//console.log("rgbw/"+i.toString()+"/speed", device_rgbw[i].speed.toString());
		//client.publish("rgbw/"+i.toString()+"/speed", device_rgbw[i].speed.toString());
		//speed & rainbow
		//console.log("rgbw/"+i.toString()+"/status", device_rgbw[i].onoff.toString());
		//client.publish("rgbw/"+i.toString()+"/status", device_rgbw[i].onoff.toString());

		}
		device_rgbw[i].heartbeat = false;
		}
		},10000)
*/


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

