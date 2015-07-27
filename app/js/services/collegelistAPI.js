
/*================================================================
=>                   Service = FacultylistAPI
==================================================================*/
/*global app, $http*/

app.service('CollegeAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getcollegelist = function (page) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/getCollegesInPages/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				alert('Unable to load list of colleges..');
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getSimilarSchoollist = function (page) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/getCollegesInPages/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				alert('Unable to load list of similar school colleges..');
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getUserslist = function (page) {
		console.log('page',page)

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/usersList/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				alert('Unable to load list of Users..');
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = FacultylistAPI  ------*/


