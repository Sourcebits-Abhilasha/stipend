/*================================================================
Service = univViewApi
==================================================================*/

app.service('univViewApi', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getUnivList = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonUniversityList';
	
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


/*-----  End of Service = univViewApi  ------*/