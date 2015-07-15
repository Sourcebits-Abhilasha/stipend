
/*================================================================
=>                   Service = FrozenpostlistAPI
==================================================================*/
/*global app, $http*/

app.service('FrozenpostlistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getfrozenpostlist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonFrozenSummaryView';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getclasslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonAddFrozenList';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.submitFrozenPost = function (data) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateFrozenList';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};


	this.editFrozenList = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateFrozenList';
		
		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.deleteFrozenList = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonDeactivateFrozenList';
		
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


/*-----  End of Service = FrozenpostlistAPI  ------*/


