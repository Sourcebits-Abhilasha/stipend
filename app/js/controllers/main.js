/*================================================================
Controller = MainCtrl
==================================================================*/

app.controller('MainCtrl', ['$scope', '$location', 'MasterAPI', '$rootScope', function ($scope, $location, MasterAPI, $rootScope) {
'use strict';

	console.log('Controller ===  MainCtrl');
	$rootScope.dropDownData = '';
	 MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    $rootScope.colgType = data['SysCollegetype'];
                    console.log('$rootScope.colgType',$rootScope.colgType);
                    $rootScope.colgArea = data['SysCollegeArea'];
                    console.log('$rootScope.colgArea',$rootScope.colgArea);
                    $rootScope.accessType = data['SysAccessType'];
                    console.log('$rootScope.accessType',$rootScope.accessType);
                    $rootScope.admissionVal = data['SysAdmissionOptionValue'];
                    console.log('$rootScope.admissionVal',$rootScope.admissionVal);
                    $rootScope.admissionBadge = data['SysAdmissionBadge'];
                    console.log('$rootScope.admissionBadge',$rootScope.admissionBadge);
                    $rootScope.sysSports = data['SysSports'];
                    $rootScope.sysSports2 = angular.copy(data['SysSports']);
                    $rootScope.sysSports3 = angular.copy(data['SysSports']);
                    $rootScope.sysSports4 = angular.copy(data['SysSports']);
                    $rootScope.sysSports5 = angular.copy(data['SysSports']);
                    $rootScope.sysSports6 = angular.copy(data['SysSports']);

                    console.log('$rootScope.sysSports',$rootScope.sysSports);

                    });
  $scope.labelsOfGraph =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.dataOfGraph = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];

  $scope.logout = function() {
    $.removeCookie('NAME');
    location.href = '/';
  }
	// $scope.getPage = function(values) {
	// 	console.log('values is ',values);
	// 	switch(values){
	// 		case 1 : $location.url('/dashboard/home');
	// 				 break;
	// 		case 2 : $location.url('/dashboard/univesity');
	// 				 break;		 	
	// 	}
	// };
}]);

/*-----  End of Controller = MainCtrl  ------*/


