
/*================================================================
=>                   Service = MasterAPI
==================================================================*/
/*global app, $http*/

app.service('MasterAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getdropdowndata = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/getMasterData';
	
		$http.get(serviceUrl)
			.success(function (data) {
				//console.log('data master API====>',data);
				deferred.resolve(data);
			})
			.error(function (err) {
				//console.log('data master API====>',Error);
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = MasterAPI  ------*/


