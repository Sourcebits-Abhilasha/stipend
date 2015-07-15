
/*================================================================
=>                   Service = coursesAPI
==================================================================*/
/*global app, $http*/

app.service('coursesAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getcourseslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonCoursesByClassAndStudentsView';
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.editCourseList = function (contentdata) {
		console.log('contentdata======>',contentdata);
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonEditCourses';
		$http.post(serviceUrl,contentdata)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;

	};

}]);


/*-----  End of Service = classesAPI  ------*/


