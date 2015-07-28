/*================================================================
=>                   Service = EditCollegeAPI
==================================================================*/
/*global app, $http*/

app.service('editCollegeAPI', ['$rootScope', '$q', 'appConfig', '$http', function($rootScope, $q, appConfig, $http) {

    'use strict';

    this.editcollegelist = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/getCollegeDetailsByID/' + data;

        $http.get(serviceUrl)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveCollegeDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/updateCollegeForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.addCollegeDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/registerCollege';

        $http.post(serviceUrl, data)
            .success(function(data) {
                alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveFreshmanDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/updateFreshMenProfileForWeb';

        $http.post(serviceUrl, data)

        .success(function(data) {
                alert('Freshman Details Uploaded Successfully');
                console.log('Freshman save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                alert('Freshman Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveGeographicDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeGeographicsForWeb';

        $http.post(serviceUrl, data)

        .success(function(data) {
                //alert('Geographic Details Uploaded Successfully');
                console.log('geographics save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                //alert('Geographic Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveEthenicityDetail = function(data) { 

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeEthnicityForWeb';

        $http.post(serviceUrl, data)

        .success(function(data) {
                console.log('Ethenicity save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveMostRepStateDetail = function(data) { 

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/saveOrUpdateStates';

        $http.post(serviceUrl, data)

        .success(function(data) {
                console.log('Most Represented States save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveCalendarDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeCalendarForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                alert('Calendar Details Uploaded Successfully');
                console.log('Calendar save data=======>', data)

                deferred.resolve(data);
            })
            .error(function(err) {
                alert('Calendar Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveWeatherDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeWeatherForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess weather', data);
                alert('Weather Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Weather Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveProminentAlumniDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addProminentAluminiForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess saveProminentAlumniDetail', data);
                alert('Prominent Alumni Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Prominent Alumni Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveCollegeRankingDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addRankingsForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess college ranking', data);
                alert('College Ranking Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('College Ranking Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveIntendedStudyDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeIntendedStudyForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess intended Study', data);
                alert('Intended Study Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Intended Study Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };
    this.saveQuickFactsDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addQuickFactsForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess addQuickFactsForWeb', data);
                alert('Quick Facts Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Quick Facts Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveLinkAndAddressDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeAddressForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess aaddCollegeAddressForWeb', data);
                alert('Link And Address Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Link And Address Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveFeesAndFinancialDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeFeesForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess aaddCollegeAddressForWeb', data);
                alert('Fees And Financial Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Fees And Financial Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveAdmissionDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/updateAdmissionOptionForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess updateAdmissionOptionForWeb', data);
                alert('Admissions Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Admissions Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

     this.saveSimilarSchoolDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addSimilarSchools';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess addSimilarSchools', data);
                alert('Admissions Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Admissions Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

     this.saveTestScoreDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeScore';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess addCollegeScore', data);
                alert('Test Score Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Test Score Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };
    this.saveSportsDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeSportsForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess addCollegeSportsForWeb', data);
                alert('Sports Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                alert('Sports Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };
    this.uploadFileToUrl = function(file, uploadFile){
        
        var deferred = $q.defer();
        var fd = new FormData();
        fd.append('file', file);

        var uploadUrl = appConfig.baseURL + '/' +uploadFile;
        console.log('uploadFile',uploadFile);
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

     this.uploadFileUrl = function(file, uploadFile){
        
        var deferred = $q.defer();
        var fd = new FormData();
        fd.append('file', file);

        var uploadUrl = appConfig.baseURL + '/' +uploadFile;
        console.log('uploadFile',uploadFile);
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
    // this.editFacultyList = function (contentdata) {
    // 	console.log('contentdata======>',contentdata);
    // 	var deferred = $q.defer();
    // 	var serviceUrl = appConfig.baseURL + '/jsonEditFaculty';
    // 	$http.post(serviceUrl,contentdata)
    // 		.success(function (data) {
    // 			deferred.resolve(data);
    // 		})
    // 		.error(function (err) {
    // 			deferred.reject(err);
    // 		});

    // 	return deferred.promise;
    // };

}]);


/*-----  End of Service = EditCollegeAPI  ------*/
