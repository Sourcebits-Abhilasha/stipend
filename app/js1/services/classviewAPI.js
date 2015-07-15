
/*================================================================
=>                   Service = classesAPI
==================================================================*/
/*global app, $http*/

app.service('classviewAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getclassview = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonClassesList';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};
	
	this.getCourseAndStudent = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonAddClasses1';
		


		$http.get(serviceUrl)
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


