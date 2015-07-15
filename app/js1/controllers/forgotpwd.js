
/*================================================================
=>                  Controller = Forgotpwd
==================================================================*/
/*global app*/

app.controller('ForgotpwdCtrl', ['$scope', 'loginAPI', 'ngProgress', function ($scope, loginAPI, ngProgress) {
	'use strict';
    $scope.resetPassword = false;
    $scope.newPassword = true;

	$scope.statusMsg = '';
	 $scope.getPassword = function() {
        $scope.resetPassword = true;
        $scope.newPassword = false;
        
        if ($scope.fgtPassword.$invalid) {
            $scope.formValidations1 = true;
            $scope.statusMsg = '';
        }
        else {
            console.log('$scope.user.regiEmailId',$scope.user.regiEmailId);
            ngProgress.start();
            var data = {
                            "emailID" : $scope.user.regiEmailId
                        }

            loginAPI.fgtPwd(data).then(
                function (data) {
                    if (data) {
                        console.log('success',data);
                        console.log('success',data.statusMsg);
                    //$location.url('/dashboard/home');
                    if(data.statusCd == 1) {
                        $scope.statusMsg = 'Email Address That you Entered is invalid';
                    } else {
                    	$scope.statusMsg = 'Reset Password Link Sent to your Email Address';
                    }
                    ngProgress.complete();
                    };             
                },
	            function (err) {
					console.log('err',err);
				});
        }
    };
	console.log('Controller ===  ForgotpwdCtrl');
   
}]);


/*-----  End of Controller = Forgotpwd  ------*/



