
/*================================================================
=>                   Service = learninglistAPI
==================================================================*/
/*global app, $http*/

app.service('LearninglistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getLearninglist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonLearningCircleSummaryView';
		


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


/*-----  End of Service = learninglistAPI  ------*/


