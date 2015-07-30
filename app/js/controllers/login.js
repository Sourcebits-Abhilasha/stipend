/*================================================================
Controller = LoginCtrl
==================================================================*/

app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'loginAPI', 'MasterAPI', 'ngProgress', 'usSpinnerService', function ($scope, $rootScope, $location, loginAPI, MasterAPI, ngProgress, usSpinnerService) {
    'use strict';
    console.log('Controller ===  LoginCtrl');
    $scope.class_status = 0;
    $rootScope.isSuperAdmin = false;
    $rootScope.isAdmin = false;
    $scope.submitForm = function() {
        if ($scope.user != null) {
            $rootScope.userName = $scope.user.userName;
            // $.cookie('name', $rootScope.userName);
        }
        // console.log('$scope.user',$rootScope.userName);
        //Login API
        if ($scope.loginForm.$invalid) {
            $scope.formValidations = true;
        }
        else {
            // ngProgress.start();
            debugger;
            usSpinnerService.spin('spinner-1');
            loginAPI.adminlogin($scope.user)
            .then(function (data) {
               // console.log('stipend login data====>',data);
                //$.cookie('isSuperAdmin', data.superAdmin);
                if (data.loginMessage != "Success") {
                    $scope.loginFailed = 'Please Enter Correct Login and Password';     
                } else {
                   // console.log('data after login',data);
                    // MasterAPI Start
                    // localStorage.setItem('userId',data.adminID);
                    $.cookie('NAME',data.firstName);
                    MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    });
                // MasterAPI End
                    $location.url('/dashboard/home');
                    ngProgress.complete();
                }             
            },
            function (err) {
                //$scope.loginFailed = 'Server is Down';     
                console.log('error');
            });
        usSpinnerService.stop('spinner-1');
        }
    };

    /*-----  Pressing enter key to login hte page  ------*/
    $(document).keypress(function(e){
    if (e.which == 13){
    $scope.submitForm();
    }
    });

}]);

/*-----  End of Controller = LoginCtrl  ------*/


