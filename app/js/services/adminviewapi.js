/*================================================================
Service = adminViewApi
==================================================================*/

app.service('adminViewApi', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	//GET method
	this.getAdminList = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonAdminUserView';
	
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

/*-----  End of Service = adminViewApi  ------*/