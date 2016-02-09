(function() {
    angular.module('app', ['onsen'])
        .controller('TodoController', function($scope, $timeout) {
            var socket = io();
            // Sätt denna i en klickfunktion
            //socket.emit('led',1);
            //$scope.on_off = "on";
            //$scope.switch1 = function(){
            //}
            $scope.alertEdit = function(){
                ons.createAlertDialog('alert-dialog.html').then(function(alertDialog) {
                    $scope.title = "Edit";
                    $scope.button1 = "Move";
                    $scope.button2 = "dis";
                    $scope.button3 = "ok";
                    alertDialog.show();
                });
                /*ons.notification.alert({
                //message: 'Message',
                messageHTML: '<div>Message in HTML</div>',
                title: 'Edit',
                buttonLabel: 'Cancel',
                animation: 'default', // or 'none'
                modifier: 'material',
                callback: function() {
                // Alert button is closed!
                }
                });*/
            }
            // Initial value of the brightness bar
            $scope.brightness1 = 50;
            // Initial value of ON/OFF button
            $scope.showingEven = 'Off';
            // on press function for ON/OFF button
            $scope.isSelected = function(){
                socket.emit('led',1);
                //$scope.showingEven = ! $scope.showingEven;
                $scope.showingEven = $scope.showingEven === 'On' ? 'Off' : 'On';
            }
        });
})();
