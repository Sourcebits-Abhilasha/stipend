/*================================================================
Controller = CoursesCtrl
==================================================================*/

app.controller('CoursesCtrl', ['$scope', 'coursesAPI', 'FileuploadAPI', function ($scope,coursesAPI,FileuploadAPI) {

'use strict';
// for tool tip
$('[data-toggle="tooltip"]').tooltip();
$scope.courseName = {};
$scope.courseId = null;
$scope.courseCount = null;
$scope.myFile = '';
// hide and show the side menu options
$scope.displayAddCourse = false;
$scope.displayUploadCourse = false;

$scope.getForm = function(values) {
	console.log('values',values);
	if(values === 1) {
		$scope.displayAddCourse = true;	
		$scope.displayUploadCourse = false;
	} else {
		$scope.displayUploadCourse = true;
		$scope.displayAddCourse = false;
	}
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
};


var getCourses = function () {
	console.log('getClasses-------->');
	$('#loading').addClass('page-loader');
	coursesAPI.getcourseslist()
	.then(
		function (data) {
          if (data !== null) {

            console.log('filter infodata---->',data.length);
            $scope.courseCount = data.length;
            $scope.coursesdata = data;
            $('#loading').removeClass('page-loader');
          }
      }
     );
}();

// open edit list item data
$scope.editListItem = function (listItemValue) {
	console.log('listItemValue',listItemValue);
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
	if(listItemValue != null) {
		 $scope.displayAddCourse = true;
		 $scope.courseId = listItemValue.courseId;
		 $scope.courseName.course = listItemValue.courseName;
		 $scope.courseName.courseDetail = listItemValue.courseDesc;
	}
}

//submit edited list item data
$scope.submitEditList = function () {
var data = 	
	{
		"courseId"   :$scope.courseId,
		"courseName" : $scope.courseName.course,
		"courseDesc" : $scope.courseName.courseDetail
	}
	coursesAPI.editCourseList(data)
	.then(
		function (data) {
          if (data !== null) {
            console.log('filter infodata---->',data);
            $scope.coursesdata = data;
          }
      	}
	);
}


$scope.uploadFile = function($files){
    var file = $scope.myFile;
    console.log('file is ' + JSON.stringify(file));
    FileuploadAPI.uploadFileToUrl();
};

//hide overlay and hide side menu
$scope.hideSideMenu = function() {
	$('#overlay').removeClass('overlay');
	$('#popup3').removeClass('side-menu-open').addClass('side-menu-close');
};
$scope.editCourse = function() {
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
};
console.log('Controller ===  CoursesCtrl');
}]);

/*-----  End of Controller = CoursesCtrl  ------*/


