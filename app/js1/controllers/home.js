/*================================================================
Controller = HomeCtrl
==================================================================*/

app.controller('HomeCtrl', ['$scope', '$location', 'DashboardAPI', '$rootScope', function ($scope, $location, DashboardAPI, $rootScope) {
'use strict';
		
	var getdashboard = function () {
		//$('#loading').addClass('page-loader');

		if($.cookie('isSuperAdmin') == 'true') {
	  		$rootScope.isSuperAdmin = true;
			$rootScope.isAdmin = false;
    	} else {
			$rootScope.isAdmin = true;
			$rootScope.isSuperAdmin = false;
    	} 
		DashboardAPI.getdashboardlist()
		.then(
			function (data) {
				console.log(data)
	          if (data !== null) {
	            $scope.dashboarddata = data;
	            $scope.name = $.cookie('name');
	            console.log('=====>',$.cookie('name'));
	            console.log('values',$scope.dashboarddata);
	          //  $('#loading').removeClass('page-loader');
	          }
	        }
	    );
    }();



	console.log('Controller ===  HomeCtrl');
}]);

/*-----  End of Controller = HomeCtrl  ------*/


