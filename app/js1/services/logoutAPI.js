
/*================================================================
=>                   Service = logoutAPI
==================================================================*/
/*global app, $http*/

app.service('logoutAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';


	this.adminlogout = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonLogOutAdmin';

		$http.get(serviceUrl)
			.success(function (data) {
				console.log('Controller ===  apisuccess');

				deferred.resolve(data);
			})
			.error(function (err) {
				console.log('Controller =====>apifail');
				
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = logoutAPI  ------*/


