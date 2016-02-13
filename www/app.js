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
            $scope.led1IsStatus = function(){
                $scope.led1Status = $scope.led1Status === 'On' ? 'Off' : 'On';
                if($scope.led1Status == 'On'){
                    socket.emit('led1_status',1);
                }
                else{
                    socket.emit('led1_status',0);
                }
            }
            $scope.led1Color = 765;
            $scope.led1IsColor = function() {
                socket.emit('led1_color',$scope.led1Color);
            } 
            $scope.led1Brightness = 50;
            $scope.led1IsBrightness = function() {
                socket.emit('led1_brightness',$scope.led1Brightness);
            } 
            // Led 2
            $scope.led2Status = 'Off';
            $scope.led2IsStatus = function(){
                $scope.led2Status = $scope.led2Status === 'On' ? 'Off' : 'On';
                if($scope.led2Status == 'On'){
                    socket.emit('led2_status',1);
                }
                else{
                    socket.emit('led2_status',0);
                }
            }
            $scope.led2Color = 765;
            $scope.led2IsColor = function() {
                socket.emit('led2_color',$scope.led2Color);
            } 
            $scope.led2Brightness = 50;
            $scope.led2IsBrightness = function() {
                socket.emit('led2_brightness',$scope.led2Brightness);
            } 
        });
})();
