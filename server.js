// run with: node server.js
var gpio = require('rpi-gpio');
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// RGB variables
var r=0, b=0, g=0;
// set pin mode
gpio.setup(16, gpio.DIR_OUT, write);

// write pin function
function write(){
    gpio.write(16, false, function(err){
        if (err) throw err;
        gpio.write(16, false);
        console.log('pin 16 low');
    });
}
    
function RGB_calc(value){
    if(value <= 255){
        r=255;
        g=value;
        b=0;
    }
    else if((value > 255) && (value <= 510)){
        r=255-(510-value);
        g=255;
        b=0;
    }
    else if((value > 510) && (value <= 765)){
        r=0;
        g=255;
        b=255-(765-value);
    }
    else if((value > 765) && (value <= 1020)){
        r=0;
        g=255-(1020-value);
        bg=255;
    }
    else if((value > 1020) && (value <= 1275)){
        r=255-(1275-value);
        g=0;
        b=255;
    }
    else if((value > 1275) && (value <= 1530)){
        r=255;
        g=0;
        b=1530-value;
    }
    else{
        console.log('color error');
    }
}
// Use the www folder
app.use(express.static('www'));
// Starts Socket.io server
io.on('connection', function(socket){
    console.log('a user connected');
    // Led 1
    socket.on('led1_brightness', function(msg){
        //gpio.write(16, msg); // make pwm
        console.log("led1_brightness = "+ msg);
    });
    socket.on('led1_color', function(msg){
        console.log("led1_color= "+ msg);
        RGB_calc(msg);
        console.log("r = "+r+" g = "+g+" b = "+b);
    });
    socket.on('led1_status', function(msg){
        gpio.write(16, msg);
        console.log("led1_status = "+ msg);
    });
    // Led 2
    socket.on('led2_brightness', function(msg){
        //gpio.write(16, msg); // make pwm
        console.log("led2_brightness = "+ msg);
    });
    socket.on('led2_color', function(msg){
        console.log("led2_color= "+ msg);
        RGB_calc(msg);
        console.log("r = "+r+" g = "+g+" b = "+b);
    });
    socket.on('led2_status', function(msg){
        gpio.write(16, msg);
        console.log("led2_status = "+ msg);
    });
});
// Starts HTTP server that shows the app
http.listen(8080, function(){
    console.log('listening on *:8080');
});
