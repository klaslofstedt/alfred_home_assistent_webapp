// run with: node server.js
var gpio = require('rpi-gpio');
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tf = false;

// set pin mode
gpio.setup(16, gpio.DIR_OUT, write);

// write pin function
function write(){
    gpio.write(16, false, function(err){
        if (err) throw err;
        gpio.write(16, tf);
        console.log('pin 16 low');
    });
}
    
// Use the www folder
app.use(express.static('www'));
// Starts Socket.io server
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('led', function(msg){
        tf = msg;
        gpio.write(16, tf);
        console.log("Led1 = "+ msg + " = "+ tf);
    });
});
// Starts HTTP server that shows the app
http.listen(8080, function(){
    console.log('listening on *:8080');
});
