
/*================================================================
=>                   Service = loginAPI
==================================================================*/
/*global app, $http*/

app.service('loginAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';


	this.adminlogin = function (admindata) {
		console.log('admindata====>',admindata);
		///sharath.reddy@sourcebits.com/XYZ
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/adminLogin/'+admindata.username+'/'+admindata.password;
		console.log('serviceUrl',serviceUrl);

		var requestBody = {
			'user' : admindata
		}
		
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

	this.fgtPwd = function (data) {
		console.log('data',data);
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/forgotPasswordForAdmin/'+ data.emailID +'/';

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

	this.changePassword = function (data) {
		console.log('data',data);
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/changePasswordForAdmin/'+ data.emailID + '/' + data.password + '/';

		$http.post(serviceUrl)
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


/*-----  End of Service = loginAPI  ------*/


