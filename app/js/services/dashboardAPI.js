
/*================================================================
=>                   Service = DashboardAPI
==================================================================*/
/*global app, $http*/

app.service('DashboardAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getdashboardlist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonHome';
		
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


/*-----  End of Service = DashboardAPI  ------*/


