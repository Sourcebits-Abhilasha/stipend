
/*================================================================
=>                   Service = pollslistAPI
==================================================================*/
/*global app, $http*/

app.service('PollslistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getpollslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSurvey';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.submitPollsDetails = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateSurvey';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.deactivatePollsDetails = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonDeactivateSurvey';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = pollslistAPI  ------*/


