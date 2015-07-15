/*================================================================
Controller = ClassesCtrl
==================================================================*/
/*global app,$*/
app.controller('ClassesCtrl', ['$scope', 'classviewAPI', function ($scope, classviewAPI) {
'use strict';

	//$scope.classes = result

    var getClasses = function () {
    	console.log('getClasses-------->');
    	$('#loading').addClass('page-loader');
    	classviewAPI.getclassview()
    	.then(
    		function (data) {
              if (data !== null) {
                console.log('filter infodata---->',data);
                $scope.classdata = data;
                $scope.noOfClasses = data.length;
                $('#loading').removeClass('page-loader');
              }
          }
         );
    }();



	$scope.getForm = function() {
		$('#overlay').addClass('overlay');
		$('#popup4').removeClass('side-menu-close').addClass('side-menu-open-wider');

		//jsonAddClasses1
		classviewAPI.getCourseAndStudent()
	    .then(function(data){
	    	if(data !== null) {
	    		$scope.course = data.listOftheCourses;
	    		console.log('data in while add class',$scope.course);
	    		console.log('data in while add class',$scope.course[1]);
	    	}
	    	//console.log('data in while add class',data);
	    },
		  function(err){
		  	console.log('error is while getting data',err);
		  });
	};

	//hide overlay and hide side menu
	$scope.hideSideMenu = function() {
		$('#overlay').removeClass('overlay');
		$('#popup4').removeClass('side-menu-open-wider').addClass('side-menu-close');
	};

	$scope.editClasses = function() {
		$('#overlay').addClass('overlay');
		$('#popup4').removeClass('side-menu-close').addClass('side-menu-open-wider');
	};
	
	
	console.log('Controller ===  ClassesCtrl');
}]);

/*-----  End of Controller = ClassesCtrl  ------*/


