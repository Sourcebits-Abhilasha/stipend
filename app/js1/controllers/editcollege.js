/*================================================================
Controller = activeMenu
==================================================================*/

app.controller('editCollege', ['$scope', 'editCollegeAPI', function ($scope, editCollegeAPI) {
'use strict';

	$scope.editCollege = function(data) {
	console.log('data is====>',data.collegeId);
	

	editCollegeAPI.adminlogin(data.collegeId)
	.then(
    		function (data) {
    			console.log('data====>',data);
              if (data !== null) {
                console.log('get college details',data);
	          }

	        }
        );
	}

}]);

/*-----  End of controller = activeMenu  ------*/