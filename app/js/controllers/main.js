/*================================================================
Controller = MainCtrl
==================================================================*/

app.controller('MainCtrl', ['$scope', '$location', 'MasterAPI', '$rootScope', '$state', function ($scope, $location, MasterAPI, $rootScope, $state) {
'use strict';

	// console.log('Controller ===  MainCtrl');
	$rootScope.dropDownData = '';

    console.log('statee-e----e-e---',$location.url());
    if (!$location.url().match('resetPassword')) {
        // console.log('true');
	 MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    $rootScope.colgType = data['SysCollegetype'];
                    // console.log('$rootScope.colgType',$rootScope.colgType);
                    $rootScope.colgArea = data['SysCollegeArea'];
                    // console.log('$rootScope.colgArea',$rootScope.colgArea);
                    $rootScope.accessType = data['SysAccessType'];
                    // console.log('$rootScope.accessType',$rootScope.accessType);
                    $rootScope.admissionVal = data['SysAdmissionOptionValue'];
                    // console.log('$rootScope.admissionVal',$rootScope.admissionVal);
                    $rootScope.admissionBadge = data['SysAdmissionBadge'];
                    // console.log('$rootScope.admissionBadge',$rootScope.admissionBadge);
                    $rootScope.sysSports = data['SysSports'];
                    $rootScope.sysSports2 = angular.copy(data['SysSports']);
                    $rootScope.sysSports3 = angular.copy(data['SysSports']);
                    $rootScope.sysSports4 = angular.copy(data['SysSports']);
                    $rootScope.sysSports5 = angular.copy(data['SysSports']);
                    $rootScope.sysSports6 = angular.copy(data['SysSports']);
                    $rootScope.sportsDivisions = data.SysSportsDivision;
                    $rootScope.sportsDivisions.forEach(function (item) {
                        item['divisionName'] = item.sysSportsDivisionName.split(' ').join('');
                    })
                    // console.log('$rootScope.sysSports ',$rootScope.sysSports) ;
                    $rootScope.userFirstName = $.cookie('NAME');
                    $rootScope.userEmailId = $.cookie('EMAIL');


                    });
    }
    // }
 

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


