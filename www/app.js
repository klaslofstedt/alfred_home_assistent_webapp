(function() {
    angular.module('app', ['onsen'])
        .controller('TodoController', function($scope, $timeout) {
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
            // Initial value of ON/OFF button
            $scope.led1Status = 'Off';
            // on press function for ON/OFF button
            $scope.led1IsStatus = function(){
                //console.log('hej');
                $scope.led1Status = $scope.led1Status === 'On' ? 'Off' : 'On';
                if($scope.led1Status == 'On'){
                    socket.emit('led1_status',1);
                }
                else{
                    socket.emit('led',0);
                }
            }
            // Initial value of the brightness bar
            $scope.led1Brightness = 50;
            $scope.led1IsBrightness = function() {
                socket.emit('led1_brightness',$scope.led1Brightness);
            } 
        });
})();
