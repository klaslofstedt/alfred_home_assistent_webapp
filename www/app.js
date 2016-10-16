(function() {
 angular.module('app', ['onsen'])
 .controller('DeviceController', function($scope, $timeout) {
		 var socket = io();
		 $scope.alertEdit = function(){
		 ons.createAlertDialog('alert-dialog.html').then(function(alertDialog) {
				 $scope.title = "Edit";
				 $scope.button1 = "Move";
				 $scope.button2 = "dis";
				 $scope.button3 = "ok";
				 alertDialog.show();
				 });
		 }
		 // Led 1
		 $scope.led1Status = 'Off';
		 $scope.led1Color = 765;
		$scope.led1Saturation = 100;
		 $scope.led1Brightness = 50;
		 var rgbwStatus = 0;
		 var rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led1Color, brightness: $scope.led1Brightness, saturation: $scope.led1Saturation};
		 $scope.led1IsStatus = function(){
		 $scope.led1Status = $scope.led1Status === 'On' ? 'Off' : 'On';
		 if($scope.led1Status == "On"){
			 rgbwStatus = 1;
		 }
		 else{
			 rgbwStatus = 0;
		 }
		 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led1Color, brightness: $scope.led1Brightness, saturation: $scope.led1Saturation};
		 socket.emit('rgbw', rgbw1);
		 }
		 $scope.led1IsColor = function() {
			 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led1Color, brightness: $scope.led1Brightness, saturation: $scope.led1Saturation};
			 socket.emit('rgbw', rgbw1);
		 } 
		 $scope.led1IsSaturation= function() {
			 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led1Color, brightness: $scope.led1Brightness, saturation: $scope.led1Saturation};
			 socket.emit('rgbw', rgbw1);
		 } 
		 $scope.led1IsBrightness = function() {
			 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led1Color, brightness: $scope.led1Brightness, saturation: $scope.led1Saturation};
			 socket.emit('rgbw', rgbw1);
		 } 

		 // Led 2
		 $scope.led2Status = 'Off';
		 $scope.led2Color = 765;
		$scope.led2Saturation = 100;
		 $scope.led2Brightness = 50;
		 var rgbwStatus = 0;
		 var rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led2Color, brightness: $scope.led2Brightness, saturation: 0};
		 $scope.led2IsStatus = function(){
		 $scope.led2Status = $scope.led2Status === 'On' ? 'Off' : 'On';
		 if($scope.led2Status == "On"){
			 rgbwStatus = 1;
		 }
		 else{
			 rgbwStatus = 0;
		 }
		 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led2Color, brightness: $scope.led2Brightness, saturation: 0};
		 socket.emit('rgbw', rgbw1);
		 }
		 $scope.led2IsColor = function() {
			 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led2Color, brightness: $scope.led2Brightness, saturation: 0};
			 socket.emit('rgbw', rgbw1);
		 } 
		 $scope.led2IsBrightness = function() {
			 rgbw1 = {id:1, onoff: rgbwStatus, color: $scope.led2Color, brightness: $scope.led2Brightness, saturation: 0};
			 socket.emit('rgbw', rgbw1);
		 } 
 });
})();
