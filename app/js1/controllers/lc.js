/*================================================================
Controller = LcCtrl
==================================================================*/

app.controller('LcCtrl', ['$scope', 'LearninglistAPI', function ($scope, LearninglistAPI) {
	'use strict';

	var getlearningcircle = function () {
		$('#loading').addClass('page-loader');
		LearninglistAPI.getLearninglist ()
		.then(
			function (data){
				if(data !== null){
					console.log('lc data',data);
					$scope.learningcircle = data;
					$scope.noOfLc = data.length;
					$('#loading').removeClass('page-loader');
				}
			}
		);
	}();




	$scope.getForm = function() {
		$('#overlay').addClass('overlay');
		$('#popup6').removeClass('side-menu-close').addClass('side-menu-open');
	};

	//hide overlay and hide side menu
	$scope.hideSideMenu = function() {
		$('#overlay').removeClass('overlay');
		$('#popup6').removeClass('side-menu-open').addClass('side-menu-close');
	};


	$scope.editLearning = function() {
		$('#overlay').addClass('overlay');
		$('#popup6').removeClass('side-menu-close').addClass('side-menu-open');
	};

	console.log('Controller ===  LcCtrl');
}]);

/*-----  End of Controller = LcCtrl  ------*/


