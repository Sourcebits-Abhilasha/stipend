/*================================================================
=>                  Controller = Forgotpwd
==================================================================*/
/*global app*/

app.controller('ForgotpwdCtrl', ['$rootScope', '$scope', 'loginAPI', 'ngProgress', 'ngDialog', 'usSpinnerService', function($rootScope, $scope, loginAPI, ngProgress, ngDialog, usSpinnerService) {
    'use strict';

    // $scope.resetPassword = {
    //     visible: false
    // };
    $scope.statusMsg = '';

    $scope.email = {
        emailId: ''
    }
    $scope.email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;


    $scope.getPassword = function(isValid) {
        if (!isValid) { //not valid
            //$scope.formValidations1 = true;
            //$scope.statusMsg = '';
            alert('Enter Correct Credentials !!');
        } else {
            // console.log('$scope.email.emailId', $scope.email.emailId);

            ngProgress.start();
            var data = {
                "emailId": $scope.email.emailId
            }

            loginAPI.fgtPwd(data).then(
                function(data) {
                    if (data) {
                        // console.log('success', data);
                        //console.log('success',data.statusMsg); not passing status message only passing string
                        //$location.url('/dashboard/home');
                        if (data == "Email doesn't Exixts") {
                            $scope.statusMsg = 'Email Address That you Entered is invalid';
                        } else {
                            $scope.statusMsg = 'Reset Password Link Sent to your Email Address';
                            //$scope.resetPassword.visible = true;
                        }
                        ngProgress.complete();
                    };
                },
                function(err) {
                    console.log('err', err);
                });
        }
    };
    // console.log('Controller ===  ForgotpwdCtrl');

}]);


/*-----  End of Controller = Forgotpwd  ------*/
