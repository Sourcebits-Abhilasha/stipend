/*================================================================
Controller = AdminCtrl
==================================================================*/

app.controller('AdminCtrl', ['$scope', 'adminViewApi', function ($scope, adminViewApi) {
'use strict';

	var getAdminList = function () {
		$('#loading').addClass('page-loader');
    	adminViewApi.getAdminList()
    	.then(
    		function (data) {
              if (data !== null) {
                console.log('admin data',data);
                $scope.adminCount = data.length;
                $scope.admin = data;
                $('#loading').removeClass('page-loader');
	          	// $scope.FacultyName = data.firstName + data.lastName;
	          	// console.log('facultydata---->',$scope.FacultyName)
	          }

	        }
        );
    }();
	console.log('Controller ===  AdminCtrl');
}]);

/*-----  End of Controller = AdminCtrl  ------*/


