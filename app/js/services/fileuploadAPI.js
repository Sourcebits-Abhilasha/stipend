
/*================================================================
=>                   Service = DashboardAPI
==================================================================*/
/*global app, $http*/

app.service('FileuploadAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.uploadFileToUrl = function(file, requestType){
        
		var deferred = $q.defer();
        var fd = new FormData();
        fd.append('file', file);

        var uploadUrl = appConfig.baseURL + '/' +uploadFile;
        console.log('requestType',requestType);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function (data){
            console.log('success data',data);

            alert(data.statusMsg);
        	deferred.resolve(data);
        })
        .error(function (err){
        	deferred.reject(err);
        });
    }

}]);


/*-----  End of Service = DashboardAPI  ------*/


