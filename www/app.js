(function() {
 angular.module('app', ['onsen'])
 .controller('DeviceController', function($scope, $timeout) {
		 var socket = io();
		 var mqttStatus = 0;
		 // Wallplug 1 (mqtt device 3)
		 $scope.mqtt3Status = 'Off';
		 $scope.mqtt3IsStatus = function(){
			 $scope.mqtt3Status = $scope.mqtt3Status === 'On' ? 'Off' : 'On';
			 if($scope.mqtt3Status == "On"){
				 mqttStatus = 1;
			 }
			 else{
				 mqttStatus = 0;
			 }
			 socket.emit('status', {id:3, onoff: mqttStatus});
		 }
		 // Wallplug 2 (mqtt device 4)
		 $scope.mqtt4Status = 'Off';
		 $scope.mqtt4IsStatus = function(){
			 $scope.mqtt4Status = $scope.mqtt4Status === 'On' ? 'Off' : 'On';
			 if($scope.mqtt4Status == "On"){
				 mqttStatus = 1;
			 }
			 else{
				 mqttStatus = 0;
			 }
			 socket.emit('status', {id:4, onoff: mqttStatus});
		 }

		 // Led 1 (mqtt device 1)
		 $scope.led1Status = 'Off';
		 $scope.led1Color = 0;
		 $scope.led1Saturation = 0;
		 $scope.led1Brightness = 100;
		 $scope.led1Speed = 20;
		 $scope.led1Rainbow = 0;

		 $scope.led1IsStatus = function(){
			 $scope.led1Status = $scope.led1Status === 'On' ? 'Off' : 'On';
			 if($scope.led1Status == "On"){
				 mqttStatus = 1;
			 }
			 else{
				 mqttStatus = 0;
			 }
			 socket.emit('status', {id:1, onoff: mqttStatus});
		 }
		 $scope.led1IsColor = function() {
			 socket.emit('color', {id:1, color: $scope.led1Color});
		 } 
		 $scope.led1IsSaturation= function() {
			 socket.emit('saturation', {id:1, saturation: $scope.led1Saturation});
		 } 
		 $scope.led1IsBrightness = function() {
			 socket.emit('brightness', {id:1, brightness: $scope.led1Brightness});
		 } 
		 $scope.led1IsRainbow = function(){
			 $scope.led1Rainbow = $scope.led1Rainbow === 1 ? 0 : 1;

			 socket.emit('rainbow', {id:1, rainbow: $scope.led1Rainbow});
		 }
		 $scope.led1IsSpeed= function() {
			 socket.emit('speed', {id:1, speed: $scope.led1Speed});
		 } 

		 // Led 2
		 $scope.led2Status = 'Off';
		 $scope.led2Color = 0;
		 $scope.led2Saturation = 0;
		 $scope.led2Brightness = 100;
		 $scope.led2Speed = 20;
		 $scope.led2Rainbow = 0;

		 $scope.led2IsStatus = function(){
			 $scope.led2Status = $scope.led2Status === 'On' ? 'Off' : 'On';
			 if($scope.led2Status == "On"){
				 mqttStatus = 1;
			 }
			 else{
				 mqttStatus = 0;
			 }
			 socket.emit('status', {id:2, onoff: mqttStatus});
		 }
		 $scope.led2IsColor = function() {
			 socket.emit('color', {id:2, color: $scope.led2Color});
		 } 
		 $scope.led2IsSaturation= function() {
			 socket.emit('saturation', {id:2, saturation: $scope.led2Saturation});
		 } 
		 $scope.led2IsBrightness = function() {
			 socket.emit('brightness', {id:2, brightness: $scope.led2Brightness});
		 } 
		 $scope.led2IsRainbow = function(){
			 $scope.led2Rainbow = $scope.led2Rainbow === 1 ? 0 : 1;

			 socket.emit('rainbow', {id:2, rainbow: $scope.led2Rainbow});
		 }
		 $scope.led2IsSpeed= function() {
			 socket.emit('speed', {id:2, speed: $scope.led2Speed});
		 } 
 });
})();
