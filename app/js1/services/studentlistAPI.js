
/*================================================================
=>                   Service = StudentlistAPI
==================================================================*/
/*global app,$http*/

app.service('studentlistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getstudentlist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonUserView';
		


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


/*-----  End of Service = StudentlistAPI  ------*/


