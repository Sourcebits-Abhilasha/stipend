

/*================================================================
App stipend
==================================================================*/
'use strict';

var app = angular.module('stipend', ['ngRoute', 'chart.js', 'ui.router', 'ngProgress', 'angularFileUpload']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    
    $stateProvider
        .state('home',  { 
            url: '/',
            requiredLogin: false,                                    
            templateUrl: 'partials/templates/login.html'
            //controller: 'FeedCrtl'      
        })
        .state('dashboard',  {
            url: '/dashboard',
            requiredLogin: true,                
            templateUrl: 'partials/templates/dashboard.html'
            //controller: 'ItemsCrtl'     
        })
        .state('dashboard.home',  {
            url: '/home',
            requiredLogin: true,      
            templateUrl: 'partials/templates/home.html'   
            //controller: 'ItemsCrtl'     
        })
        .state('dashboard.colleges',  {
            url: '/colleges',
            requiredLogin: true,              
            templateUrl: 'partials/templates/colleges.html'   
            //controller: 'ItemsCrtl'     
        })
        .state('dashboard.edit-colleges',  {
            url: '/edit-colleges',
            requiredLogin: true,              
            templateUrl: 'partials/templates/edit-colleges.html'   
            //controller: 'ItemsCrtl'     
        })
       
        .state('dashboard.users',  {
            url: '/users',
            requiredLogin: true,              
            templateUrl: 'partials/templates/users.html'   
            //controller: 'ItemsCrtl'     
        })
        .state('dashboard.weather',  {
            url: '/weather',
            requiredLogin: true,              
            templateUrl: 'partials/templates/weather.html'   
            //controller: 'ItemsCrtl'     
        })
        // .state('dashboard.colleges',  {
        //     url: '/colleges',
        //     requiredLogin: true,           
        //     templateUrl: 'partials/templates/colleges.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.courses',  {
        //     url: '/courses',
        //     requiredLogin: true,                     
        //     templateUrl: 'partials/templates/courses.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.classes',  {
        //     url: '/classes',
        //     requiredLogin: true,                     
        //     templateUrl: 'partials/templates/classes.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.students',  {
        //     url: '/students',
        //     requiredLogin: true,                     
        //     templateUrl: 'partials/templates/students.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.lc',  {
        //     url: '/lc',
        //     requiredLogin: true,                     
        //     templateUrl: 'partials/templates/lc.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.frozen-post',  {
        //     url: '/frozen-post',  
        //     requiredLogin: true,                   
        //     templateUrl: 'partials/templates/frozen-post.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.polls',  {
        //     url: '/polls', 
        //     requiredLogin: true,                    
        //     templateUrl: 'partials/templates/polls.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        // .state('dashboard.import',  {
        //     url: '/import',
        //     requiredLogin: true,                     
        //     templateUrl: 'partials/templates/import.html'   
        //     //controller: 'ItemsCrtl'     
        // })
        .state('dashboard.admin',  {
            url: '/admin',
            requiredLogin: true,                     
            templateUrl: 'partials/templates/admin.html'   
            //controller: 'ItemsCrtl'     
        })
        .state('forgotpassword',  {
            url: '/forgotpassword',
            //requiredLogin: true,                     
            templateUrl: 'partials/templates/forgot-password.html'   
            //controller: 'ItemsCrtl'     
        });
        $urlRouterProvider.otherwise('/');

        // This is required for Browser Sync to work poperly
        // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


}]);



app.run(['$rootScope', '$state', '$location', '$window', function ($rootScope, $state, $location, $window) {
    
    'use strict';

    console.log('Angular.js run() function...');

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.currentState = toState.name;
        
        console.log('state --->', toState.name,$.cookie('name'));
        
        // debugger;
        
        if (toState.requiredLogin && !isLoggedIn()) {
            event.preventDefault();
            $location.url('/');
            $window.location.assign('/');
        } 
        else {
          $rootScope.currentState = toState.name;
        }    
                   
    });

    var isLoggedIn = function () {
        if ($.cookie('name') != undefined) {
            var accessId = $.cookie('name');
            return  (!accessId) ? false : true;
        }
        else {
            event.preventDefault();
            $location.url('/');
        }
    };

    
}]);



app.constant('appConfig', {

    
    //baseURL : 'http://192.168.10.229:8080/stipendadmin'
    baseURL : 'http://ec2-52-10-5-217.us-west-2.compute.amazonaws.com:8080/Stipend' 
    // baseURL : 'http://192.168.11.134:8085/Stipend'
    
});

/*================================================================
Controller = AdminCtrl
==================================================================*/

app.controller('AdminCtrl', ['$scope', 'adminViewApi', function ($scope, adminViewApi) {
'use strict';

	var getAdminList = function () {
		$('#loading').addClass('page-loader');
    	adminViewApi.getAdminList()
    	.then(
    		function (data) {
              if (data !== null) {
                console.log('admin data',data);
                $scope.adminCount = data.length;
                $scope.admin = data;
                $('#loading').removeClass('page-loader');
	          	// $scope.FacultyName = data.firstName + data.lastName;
	          	// console.log('facultydata---->',$scope.FacultyName)
	          }

	        }
        );
    }();
	console.log('Controller ===  AdminCtrl');
}]);

/*-----  End of Controller = AdminCtrl  ------*/



/*================================================================
Controller = ClassesCtrl
==================================================================*/
/*global app,$*/
app.controller('ClassesCtrl', ['$scope', 'classviewAPI', function ($scope, classviewAPI) {
'use strict';

	//$scope.classes = result

    var getClasses = function () {
    	console.log('getClasses-------->');
    	$('#loading').addClass('page-loader');
    	classviewAPI.getclassview()
    	.then(
    		function (data) {
              if (data !== null) {
                console.log('filter infodata---->',data);
                $scope.classdata = data;
                $scope.noOfClasses = data.length;
                $('#loading').removeClass('page-loader');
              }
          }
         );
    }();



	$scope.getForm = function() {
		$('#overlay').addClass('overlay');
		$('#popup4').removeClass('side-menu-close').addClass('side-menu-open-wider');

		//jsonAddClasses1
		classviewAPI.getCourseAndStudent()
	    .then(function(data){
	    	if(data !== null) {
	    		$scope.course = data.listOftheCourses;
	    		console.log('data in while add class',$scope.course);
	    		console.log('data in while add class',$scope.course[1]);
	    	}
	    	//console.log('data in while add class',data);
	    },
		  function(err){
		  	console.log('error is while getting data',err);
		  });
	};

	//hide overlay and hide side menu
	$scope.hideSideMenu = function() {
		$('#overlay').removeClass('overlay');
		$('#popup4').removeClass('side-menu-open-wider').addClass('side-menu-close');
	};

	$scope.editClasses = function() {
		$('#overlay').addClass('overlay');
		$('#popup4').removeClass('side-menu-close').addClass('side-menu-open-wider');
	};
	
	
	console.log('Controller ===  ClassesCtrl');
}]);

/*-----  End of Controller = ClassesCtrl  ------*/



/*================================================================
Controller = CollegeCtrl
==================================================================*/

app.controller('CollegeCtrl', ['$scope', 'CollegeAPI', 'editCollegeAPI', '$rootScope', function($scope, CollegeAPI, editCollegeAPI, $rootScope) {
    'use strict';
    var inStateData = [1, 3, 4, 5, 6];
    var outStateData = [1, 2, 4, 5, 6];
    var tempFees = {};

    $scope.colgList = false;
    $scope.editList = true;

    $scope.fallWeather = false;
    $scope.winterWeather = true;
    $scope.springWeather = true;
    $scope.summerWeather = true;


    $scope.menSports = false;
    $scope.womenSports = true;

    $scope.outState = false;
    $scope.inState = true;

    $scope.outStateData = [];
    $scope.inStateData = [];
    $scope.outStateTotal = 0;
    $scope.inStateTotal = 0;
    // $scope.labels1 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    //      $scope.data1 = [300, 500, 100];
    $scope.college = {
        colgName: '',
        colgLongitude: '',
        colgLatitude: ''
    };
    $scope.freshman = {
        totApplicants: ''
    };
    $scope.calendar = {
        evtName: '',
        evtDate: ''
    };
    $scope.quickFact = {

    };
    $scope.weatherObj = {

    };

    $scope.delSelectedAns = function(count) {

        console.log('i m here in count', count);
        console.log('$scope.ans', $scope.ans);
        $('.answer-div-' + count).remove();
        //$scope.ans.splice(count,1);
        console.log('$scope.ans', $scope.ans);
        //$scope.ans.splice(count,1);
        delete $scope.ans[count]

    };

    $scope.delSelectedProminent = function(count) {

        console.log('i m here in count', count);
        console.log('$scope.prominentArray', $scope.prominentArray);
        $('.prominent-alumni-div-' + count).remove();
        console.log('$scope.prominentArray', $scope.prominentArray);
        delete $scope.prominentArray[count]

    };

    $scope.delSelectedCollegeRanking = function(count) {

        console.log('i m here in count', count);
        console.log('$scope.clgRankingArray', $scope.clgRankingArray);
        console.log('$scope.clgRankingPointsArray', $scope.clgRankingPointsArray);
        $('.college-ranking-' + count).remove();
        delete $scope.clgRankingArray[count];
        delete $scope.clgRankingPointsArray[count]

    };

    $scope.delSelectedLinkAndAddress = function(count) {

        console.log('i m here in count', count);
        console.log('$scope.websiteNameArray', $scope.websiteNameArray);
        $('.college-address-div-' + count).remove();
        console.log('$scope.websiteNameArray', $scope.websiteNameArray);
        delete $scope.websiteNameArray[count];
        delete $scope.websiteURLArray[count];

    };

    $scope.delSelectedCalendar = function(count) {

        console.log('i m here in count', count);
        console.log('$scope.calendarEventNameArray', $scope.calendarEventNameArray);
        $('.calendar-div-' + count).remove();
        console.log('$scope.calendarEventNameArray', $scope.calendarEventNameArray);
        //delete $scope.calendarArray[count]
        delete $scope.calendarEventNameArray[count];
        delete $scope.calendarEventDateArray[count];

    };

    //console.log($.cookie());
    $scope.getcollege = function() {
        //$('body').addClass('page-loader');
        CollegeAPI.getcollegelist()
            .then(
                function(data) {
                    console.log('data====>', data);
                    if (data !== null) {
                        $scope.collegedata = data;
                        $scope.similarSchoolColgData = data;
                        $scope.collegeCount = data.length;
                        //$('body').removeClass('page-loader');
                        // $scope.FacultyName = data.firstName + data.lastName;
                        // console.log('facultydata---->',$scope.FacultyName)
                    }

                }
            );
    };
    $scope.getcollege();

    $scope.editCollege = function(data) {
        //$('body').addClass('page-loader');
        console.log('data is in ====>', data);
        $rootScope.colgData = data;
        editCollegeAPI.editcollegelist(data.collegeId)
            .then(
                function(data) {
                    console.log('data Edit College====>', data);
                    if (data !== null) {
                        $scope.selectedSportsDiv1 = []; $scope.selectedSportsDiv2 = []; $scope.selectedSportsDiv3 = [];
                        $scope.selectedSportsDiv11 = []; $scope.selectedSportsDiv22 = []; $scope.selectedSportsDiv33 = [];
                        $scope.colgList = true;
                        $scope.editList = false;
                        // console.log('get college details',data['College'].collegeName);
                        $scope.college.colgName = data['College'].collegeName;
                        //Store Collge Type Id
                        $scope.college.collegeTypeId = data['College'].collegeTypeId;
                        //Drop-Down -> Model Name from HTML = (college_id from data you getting)
                        $scope.college.colgType = $scope.college.collegeTypeId;

                        $scope.college.accessTypeID = data['College'].accessTypeID;
                        //$scope.college.colgArea = $scope.college.accessTypeID;
                        $scope.college.accessType = $scope.college.accessTypeID;

                        $scope.college.colgAreaID = data['College'].collegeAreaID;

                        //Drop-Down -> Model Name from HTML = (college_id from data you getting)

                        $scope.college.colgArea = $scope.college.colgAreaID;


                        $scope.college.colgLongitude = data['College'].collegeLongitude;
                        $scope.college.colgLatitude = data['College'].collegeLatitude;
                        $scope.college.colgStreet = data['College'].streetName;
                        $scope.college.colgCity = data['College'].city;
                        $scope.college.colgState = data['College'].state;
                        $scope.college.colgPhn = data['College'].telephoneNumber;
                        $scope.college.colgEmail = data['College'].officeEmailAddress;
                        $scope.college.colgZip = data['College'].zip;
                        $scope.college.colgStreet = data['College'].streetName;
                        $scope.college.colgState = data['College'].state;
                        $scope.college.colgTelephoneNumber = data['College'].telephoneNumber;
                        $scope.college.colgOfficeEmailAddress = data['College'].officeEmailAddress;

                        $scope.freshman.enrollmentID = data['FreshmanProfile']['FreshManProfile'].enrollmentStatusId;
                        $scope.freshman.totApplicants = data['FreshmanProfile']['FreshManProfile'].totalApplicants;
                        $scope.freshman.totAccepted = data['FreshmanProfile']['FreshManProfile'].totalAccepted;
                        $scope.freshman.xptanceRate = data['FreshmanProfile']['FreshManProfile'].acceptanceRate;
                        $scope.freshman.totEnrolled = data['FreshmanProfile']['FreshManProfile'].totalEnrolled;
                        $scope.freshman.earlyDecision = data['FreshmanProfile']['FreshManProfile'].percentageEnrolledEarlyDecision;
                        $scope.freshman.waitingList = data['FreshmanProfile']['FreshManProfile'].percentageEnrolledFromWaitList;
                        $scope.freshman.outFState = data['FreshmanProfile']['FreshManProfile'].percentageEnrolledOutofState;
                        $scope.freshman.ernPiblicHS = data['FreshmanProfile']['FreshManProfile'].percentageEnrolledPublicHs;
                        $scope.freshman.rcvFinanceAid = data['FreshmanProfile']['FreshManProfile'].percentageReceivingFinancialAid;
                        $scope.freshman.avgFinanceAid = data['FreshmanProfile']['FreshManProfile'].averageFinancialAid;
                        $scope.freshman.malePer = data['FreshmanProfile']['FreshManProfile'].malePercentage;
                        $scope.freshman.femalePer = data['FreshmanProfile']['FreshManProfile'].femalePercentage;
                        $scope.freshman.collegeEthnicityID = data['FreshmanProfile']['CollegeEthnicity'].collegeEthnicityID;

                        $scope.weatherObj.avgFallLowTemp = data['Weather'];
                        // $scope.quickFact.qukFact = data['QuickFacts'].quickFactsValue;

                        $scope.geoData = data['FreshmanProfile']['Geographics'];
                        $scope.clgEthenicity = data['FreshmanProfile']['CollegeEthnicity'];
                        $scope.intendedStudy = data['IntendedStudy']['Study'];
                        $scope.admission = data['Admissions']['Admission'];
                        $scope.interview = data['Admissions']['Interviews'];
                        $scope.recommendation = data['Admissions']['Recommendations'];

                        $scope.SatData =  data.TestScoresAndGrades.SAT;
                        $scope.ActData =  data.TestScoresAndGrades.ACT;

                        $scope.testScoreAvg =  data.TestScoresAndGrades.TestScoresAndGrades;

                        // $scope.satLowerCriticalReading = data['TestScoresAndGrades']['SAT']['CriticalReading'].scoreLowerLimit;
                        // $scope.satHigherCriticalReading = data['TestScoresAndGrades']['SAT']['CriticalReading'].scoreHigherLimit;
                        // $scope.satHigherCriticalReading = data['TestScoresAndGrades']['SAT']['CriticalReading'].collegeScoreId;
                        // $scope.satLowMath = data['TestScoresAndGrades']['SAT']['Math'].scoreLowerLimit;
                        // $scope.satHighMath = data['TestScoresAndGrades']['SAT']['Math'].scoreHigherLimit;
                        // $scope.satLowWriting = data['TestScoresAndGrades']['SAT']['Writing'].scoreLowerLimit;
                        // $scope.satHighWriting = data['TestScoresAndGrades']['SAT']['Writing'].scoreHigherLimit;

                        // $scope.actLowEnglish = data['TestScoresAndGrades']['ACT']['English'].scoreLowerLimit;
                        // $scope.actHighEnglish = data['TestScoresAndGrades']['ACT']['English'].scoreHigherLimit;
                        // $scope.actLowMath = data['TestScoresAndGrades']['ACT']['Math'].scoreLowerLimit;
                        // $scope.actHighMath = data['TestScoresAndGrades']['ACT']['Math'].scoreHigherLimit;

                        // $scope.colgScoreId = data['TestScoresAndGrades'].collegeScoreId;
                        $scope.sports = data.Sports;

                        $scope.actScore = data['TestScoresAndGrades']['ACTSCORES'];

                        $scope.satScore = data['TestScoresAndGrades']['SATSCORES'];

                        $scope.gpaScore = data['TestScoresAndGrades']['GPASCORES'];


                        // $scope.sysSports = data['SysSports'];
                        // $scope.manSportsDiv1 = data['Sports']['Men']['NCAADIVISION1'];
                        // $scope.manSportsDiv2 = data['Sports']['Men']['NCAADIVISION2'];
                        // $scope.manSportsDiv3 = data['Sports']['Men']['NCAADIVISION3'];  SysSports




                        $scope.weatherObj.weatherId = data['Weather'].weatherId;
                        $scope.weatherObj.avgFallLowTemp = data['Weather'].averageFallLowTemp;
                        $scope.weatherObj.avgFallHighTemp = data['Weather'].averageFallHighTemp;
                        $scope.weatherObj.avgFallPrecipitation = data['Weather'].averageFallPrecipitation;
                        $scope.weatherObj.avgWinterLowTemp = data['Weather'].averageWinterLowTemp;
                        $scope.weatherObj.avgWinterHighTemp = data['Weather'].averageWinterHighTemp;
                        $scope.weatherObj.avgWinterPrecipitation = data['Weather'].averageWinterPrecipitation;
                        $scope.weatherObj.avgSummerLowTemp = data['Weather'].averageSummerLowTemp;
                        $scope.weatherObj.avgSummerHighTemp = data['Weather'].averageSummerHighTemp;
                        $scope.weatherObj.avgSummerPrecipitation = data['Weather'].averageSummerPrecipitation;
                        $scope.weatherObj.avgSpringLowTemp = data['Weather'].averageSpringLowTemp;
                        $scope.weatherObj.avgSpringHighTemp = data['Weather'].averageSpringHighTemp;
                        $scope.weatherObj.avgSpringPrecipitation = data['Weather'].averageSpringPrecipitation;

                        $scope.quickFact.quickFactsVal = data['QuickFacts'].quickFactsValue;
                        $scope.quickFact.quickFactsID = data['QuickFacts'].quickFactsID;

                        $scope.feesAndFinancial = data.FeesAndFinancialAids;
                        var dataFees = data.FeesAndFinancialAids;

                        for (var i = 0; i < dataFees.length; i++) {
                            tempFees[dataFees[i].sysFeesStructureID] = dataFees[i].fees;
                        };


                        $scope.test = data.Calender;
                        $scope.collegeRanking = data.CollegeRanking;
                        $scope.prominentAlumni = data.ProminentAlumini;
                        $scope.similerSchool = data.similarSchool;
                        $scope.linkAndAddress = data.LinksAndAddresses;
                        //$scope.webDetailID = data['LinksAndAddresses'][0].websiteDetailsId;
                        //$scope.websiteName = data['websiteName'].websiteName;
                        //console.log(' $scope.webDetailID', $scope.webDetailID);
                        // $scope.data.quickFactsValue = data.QuickFacts[0].quickFactsValue;

                        //----------- Fees and financial Aid
                        // var feesAndFinancialAids = data['FeesAndFinancialAids'];
                        // feesAndFinancialAids.push({
                        //     percentangeInState: 81,
                        //     percentangeOutState: 90,
                        //     avgInState: 200,
                        //     avgOutState: 41555
                        // });
                        // var feesAndFinancialAidsLength = feesAndFinancialAids.length;


                        // for (var i = 0; i < feesAndFinancialAidsLength; i++) {
                        //     var obj = feesAndFinancialAids[i];
                        //     if (obj.inState == true) {
                        //         $scope.inStateData.push(obj);
                        //         $scope.inStateTotal = $scope.inStateTotal + obj.fees;
                        //     } else if (obj.inState == false) {
                        //         $scope.outStateData.push(obj);
                        //         $scope.outStateTotal = $scope.outStateTotal + obj.fees;
                        //     } else {
                        //         $scope.financialAid = obj;
                        //     }
                        // }

                        $scope.sports.Men.NCAADIVISION1.forEach(function (item) {
                            $scope.selectedSportsDiv1.push(item.syssportsId);
                        });
                        $scope.sports.Men.NCAADIVISION2.forEach(function (item) {
                            $scope.selectedSportsDiv2.push(item.syssportsId);
                        });
                        $scope.sports.Men.NCAADIVISION3.forEach(function (item) {
                            $scope.selectedSportsDiv3.push(item.syssportsId);
                        });

                        $scope.sports.Women.NCAADIVISION1.forEach(function (item) {
                            $scope.selectedSportsDiv11.push(item.syssportsId);
                        });
                        $scope.sports.Women.NCAADIVISION2.forEach(function (item) {
                            $scope.selectedSportsDiv22.push(item.syssportsId);
                        });
                        $scope.sports.Women.NCAADIVISION3.forEach(function (item) {
                            $scope.selectedSportsDiv33.push(item.syssportsId);
                        });

                        $rootScope.sysSports.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 1;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 1;
                             $scope.selectedSportsDiv1.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });
                        $rootScope.sysSports2.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 2;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 1;
                             $scope.selectedSportsDiv2.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });
                        $rootScope.sysSports3.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 3;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 1;
                             $scope.selectedSportsDiv3.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });

                        $rootScope.sysSports4.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 1;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 2;
                             $scope.selectedSportsDiv11.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });

                        $rootScope.sysSports5.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 2;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 2;
                             $scope.selectedSportsDiv22.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });

                        $rootScope.sysSports6.forEach(function (item){
                            item['isChecked'] = false;
                            item['sysSportsDivisionID'] = 3;
                            item['collegeId'] = $rootScope.colgData.collegeId;
                            item['genderId'] = 2;
                             $scope.selectedSportsDiv33.forEach(function (i) {
                                if (item.syssportsId == i) {
                                    item.isChecked = true;
                                }
                             })
                        });


                        console.log('$scope.selectedSportsDiv1',$scope.selectedSportsDiv1);

                    }

                }
            );
    }
    $scope.saveCollege = function() {
        //debugger
        //$('body').addClass('page-loader');
        console.log('save detail====>', $rootScope.colgData);

        var data = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeName': $scope.college.colgName ? $scope.college.colgName : null,
            'collegeTypeId': $rootScope.colgData['collegeTypeId'] ? $rootScope.colgData['collegeTypeId'] : null,
            'city': $scope.college.colgCity ? $scope.college.colgCity : null,
            'collegeLatitude': $scope.college.colgLatitude ? $scope.college.colgLatitude : null,
            'collegeLongitude': $scope.college.colgLongitude ? $scope.college.colgLongitude : null,
            'accessTypeID': $scope.college.colgAccessTypeID ? $scope.college.colgAccessTypeID : null,
            'collegeAreaID': $scope.college.colgAreaID ? $scope.college.colgAreaID : null
        };

        console.log('data finally data', data);
        editCollegeAPI.saveCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });
        //$('body').removeClass('page-loader');

    }

    $scope.saveQuickFact = function() {
        //debugger
        console.log('save saveQuickFact====>', $rootScope.colgData);
        var qukFact = {

            'quickFactsValue': $scope.quickFact.quickFactsVal ? $scope.quickFact.quickFactsVal : null,
            'quickFactsID': $scope.quickFact.quickFactsID ? $scope.quickFact.quickFactsID : null

        };

        console.log('data saveQuickFact', qukFact);
        editCollegeAPI.saveQuickFactsDetail(qukFact)
            .then(
                function(data) {
                    console.log('save saveQuickFact====>', data);
                });
    }



    $scope.saveFreshman = function() {
        // $scope.enrollmentID = $scope.enrollmentStatusId
        console.log('testData', $scope.geoData);
        console.log('testData for ethecity', $scope.clgEthenicity);
        var finalGeoData = [];

        for (var count = 0; count < $scope.geoData.length; count++) {
            var finalGeoObject = {};

            finalGeoObject['collegeGeographicsId'] = $scope.geoData[count].collegeGeographicsId;
            // finalGeoObject['sysgeographicsId'] = $scope.geoData[count].sysgeographicsId;
            finalGeoObject['geographicsPercentage'] = $scope.geoData[count].geographicsPercentage;
            finalGeoData.push(finalGeoObject);
        }
        console.log('final geographical array', finalGeoData);

        console.log('data finally geographical data', finalGeoData);
        editCollegeAPI.saveGeographicDetail(finalGeoData)
            .then(
                function(data) {
                    console.log('save geographic detail====>', data);
                });


        var finalethEncityData = [];

        for (var count = 0; count < $scope.clgEthenicity.length; count++) {
            var finalEthencityObject = {};
            // debugger;
            finalEthencityObject['collegeEthnicityID'] = $scope.clgEthenicity[count].collegeEthnicityID;
            finalEthencityObject['ethnicityPercentage'] = $scope.clgEthenicity[count].ethnicityPercentage;
            finalethEncityData.push(finalEthencityObject);
        }

        console.log('data finally Ethenicity data', finalethEncityData);
        editCollegeAPI.saveEthenicityDetail(finalethEncityData)
            .then(
                function(data) {
                    console.log('save Ethenicity detail====>', data);
                });
        console.log('data finally Ethenicity data', finalethEncityData);

        //var enrollmentID = $scope.enrollmentStatusId;
        var freshmanData = {
            // 'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            // 'collegeTypeId': $rootScope.colgData['collegeTypeId'] ? $rootScope.colgData['collegeTypeId'] : null,
            'enrollmentStatusId': $scope.freshman.enrollmentID ? $scope.freshman.enrollmentID : null,
            'totalApplicants': $scope.freshman.totApplicants ? $scope.freshman.totApplicants : null,
            'totalAccepted': $scope.freshman.totAccepted ? $scope.freshman.totAccepted : null,
            'acceptanceRate': $scope.freshman.xptanceRate ? $scope.freshman.xptanceRate : null,
            'totalEnrolled': $scope.freshman.totEnrolled ? $scope.freshman.totEnrolled : null,
            'percentageEnrolledEarlyDecision': $scope.freshman.earlyDecision ? $scope.freshman.earlyDecision : null,
            'percentageEnrolledFromWaitList': $scope.freshman.waitingList ? $scope.freshman.waitingList : null,
            'percentageEnrolledOutofState': $scope.freshman.outFState ? $scope.freshman.outFState : null,
            'percentageEnrolledPublicHs': $scope.freshman.ernPiblicHS ? $scope.freshman.ernPiblicHS : null,
            'averageFinancialAid': $scope.freshman.avgFinanceAid ? $scope.freshman.avgFinanceAid : null,
            'percentageReceivingFinancialAid': $scope.freshman.rcvFinanceAid ? $scope.freshman.rcvFinanceAid : null,
            'malePercentage': $scope.freshman.malePer ? $scope.freshman.malePer : null,
            'femalePercentage': $scope.freshman.femalePer ? $scope.freshman.femalePer : null
        };
        //console.log('enrollmentStatusId============>', enrollmentStatusId)
        //console.log('freshmanData========>', freshmanData);

        console.log('data finally Freshman Common data', freshmanData);
        editCollegeAPI.saveFreshmanDetail(freshmanData)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });

    };

    // $scope.saveCalendar = function() {
    //     //console.log('testData Calendar data',$scope.test);
    //     var finalCalendarData = [];

    //     for (var count = 0; count < $scope.test.length; count++) {
    //         var finalCalendarObject = {};
    //         finalCalendarObject['collegeCalendarId'] = $scope.test[count].collegeCalendarId;
    //         finalCalendarObject['eventName'] = $scope.test[count].eventName;
    //         finalCalendarObject['eventDate'] = $scope.test[count].eventDate;
    //         finalCalendarData.push(finalCalendarObject);
    //     }

    //     console.log('final array for calendar', finalCalendarData);

    //     editCollegeAPI.saveCalendarDetail(finalCalendarData)
    //         .then(
    //             function(data) {
    //                 // console.log('save detail====>', data);
    //             });

    // };

    $scope.saveCollegeRanking = function() {
        console.log('testData College ranking data', $scope.collegeRanking);
        var finalColegeRankingData = [],
            collegeId = $scope.collegeRanking[0].collegeId;
        /* Scope Data */
        for (var count = 0; count < $scope.collegeRanking.length; count++) {
            var finalColegeRankingObject = {};
            // finalColegeRankingObject['collegeId'] = collegeId;
            finalColegeRankingObject['collegeRankingId'] = $scope.collegeRanking[count].collegeRankingId;
            finalColegeRankingObject['ranking'] = $scope.collegeRanking[count].ranking;
            finalColegeRankingObject['rankingPoints'] = $scope.collegeRanking[count].rankingPoints;
            finalColegeRankingData.push(finalColegeRankingObject);
        }
        /* Custom Array from Directive */
        var clgRankingArray = $scope.clgRankingArray;
        var clgRankingPointsArray = $scope.clgRankingPointsArray;

        for (var i = 1; i < clgRankingArray.length; i++) {
            if (clgRankingArray[i] != undefined) {
                var finalColegeRankingObject = {};
                finalColegeRankingObject['collegeId'] = $rootScope.colgData['collegeId']
                finalColegeRankingObject['ranking'] = clgRankingArray[i];
                finalColegeRankingObject['rankingPoints'] = clgRankingPointsArray[i];
                finalColegeRankingData.push(finalColegeRankingObject);
            }
        }

        console.log('final saveColegeRanking array', finalColegeRankingData);

        editCollegeAPI.saveCollegeRankingDetail(finalColegeRankingData)
            .then(
                function(data) {
                    console.log('save detail saveCollegeRankingDetail====>', data);
                });

    };

    $scope.saveProminentAlumni = function() {
        console.log('testData Prominent Alumni data', $scope.prominentAlumni);
        var finalProminentAlumniData = [],
            collegeId = $scope.prominentAlumni[0].collegeId;
        /* Scope Data */
        for (var count = 0; count < $scope.prominentAlumni.length; count++) {
            var finalProminentAlumniObject = {};
            finalProminentAlumniObject['alumniId'] = $scope.prominentAlumni[count].alumniId;
            finalProminentAlumniObject['alumniName'] = $scope.prominentAlumni[count].alumniName;
            // finalProminentAlumniObject['collegeId'] = collegeId;

            finalProminentAlumniData.push(finalProminentAlumniObject);
        }


        /* Custom Array from Directive */
        var prominentArray = $scope.prominentArray;
        for (var i = 1; i < prominentArray.length; i++) {
            if (prominentArray[i] != undefined) {
                var finalProminentAlumniObject = {};
                finalProminentAlumniObject['collegeId'] = $rootScope.colgData['collegeId']
                finalProminentAlumniObject['alumniName'] = prominentArray[i];

                finalProminentAlumniData.push(finalProminentAlumniObject);
            }
        }

        console.log('final array', finalProminentAlumniData);

        editCollegeAPI.saveProminentAlumniDetail(finalProminentAlumniData)
            .then(
                function(data) {
                    console.log('save detail Prominent Alumni====>', data);
                });

    };

    $scope.saveAddress = function() {
        console.log('Save Address data', $scope.linkAndAddress);
        var finalLinkAndAddressData = [],
            collegeId = $scope.linkAndAddress[0].collegeId;

        /* Scope Data */
        for (var count = 0; count < $scope.linkAndAddress.length; count++) {
            var finalLinkAndAddressObject = {};
            finalLinkAndAddressObject['websiteName'] = $scope.linkAndAddress[count].websiteName;
            finalLinkAndAddressObject['websiteUrl'] = $scope.linkAndAddress[count].websiteUrl;
            finalLinkAndAddressObject['websiteDetailsId'] = $scope.linkAndAddress[count].websiteDetailsId;

            finalLinkAndAddressData.push(finalLinkAndAddressObject);
        }


        /* Custom Array from Directive */
        var websiteNameArray = $scope.websiteNameArray;
        for (var i = 1; i < websiteNameArray.length; i++) {
            if (websiteNameArray[i] != undefined) {
                var finalLinkAndAddressObject = {};
                finalLinkAndAddressObject['collegeId'] = $rootScope.colgData['collegeId']
                finalLinkAndAddressObject['websiteName'] = $scope.websiteNameArray[i];
                finalLinkAndAddressObject['websiteUrl'] = $scope.websiteURLArray[i];

                finalLinkAndAddressData.push(finalLinkAndAddressObject);
            }
        }

        console.log('final array', finalLinkAndAddressData);

        editCollegeAPI.saveLinkAndAddressDetail(finalLinkAndAddressData)
            .then(
                function(data) {
                    console.log('save detail LinkAndAddress====>', data);
                });
        //AnotherAPI CAll
        var data = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeName': $scope.college.colgName ? $scope.college.colgName : null,
            'collegeTypeId': $rootScope.colgData['collegeTypeId'] ? $rootScope.colgData['collegeTypeId'] : null,
            'city': $scope.college.colgCity ? $scope.college.colgCity : null,
            'streetName': $scope.college.colgStreet ? $scope.college.colgStreet : null,
            'state': $scope.college.colgState ? $scope.college.colgState : null,
            'zip': $scope.college.colgZip ? $scope.college.colgZip : null,
            'telephoneNumber': $scope.college.colgTelephoneNumber ? $scope.college.colgTelephoneNumber : null,
            'officeEmailAddress': $scope.college.colgOfficeEmailAddress ? $scope.college.colgOfficeEmailAddress : null
        };

        console.log('data finally data', data);
        editCollegeAPI.saveCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });

    };

    $scope.saveIntendedStudy = function() {
        console.log('testData saveIntendedStudy data', $scope.intendedStudy);
        var finalIntendedStudyData = [];

        for (var count = 0; count < $scope.intendedStudy.length; count++) {
            var finalIntendedStudyObject = {};
            finalIntendedStudyObject['collegeIntendedStudyID'] = $scope.intendedStudy[count].collegeIntendedStudyID;
            finalIntendedStudyObject['intendedStudyName'] = $scope.intendedStudy[count].intendedStudyName;
            finalIntendedStudyObject['intendedStudyType'] = $scope.intendedStudy[count].intendedStudyType;
            finalIntendedStudyObject['intendedStudyPercentage'] = $scope.intendedStudy[count].intendedStudyPercentage;

            finalIntendedStudyData.push(finalIntendedStudyObject);
        }
        console.log('final array IntendedStudy', finalIntendedStudyData);

        editCollegeAPI.saveIntendedStudyDetail(finalIntendedStudyData)
            .then(
                function(data) {
                    console.log('save detail IntendedStudy====>', data);
                });

    };

    $scope.$watch('sports',function (newValue,oldValue){
        console.log('newValue',newValue);
    },true);

    $scope.saveSports = function() {
        console.log('Sports $scope.menSports', $scope.menSports);
        // console.log('Sports data2', $rootScope.sysSports2);
        // console.log('Sports data3', $rootScope.sysSports3);

        var finalSportsData = [];

        $rootScope.sysSports.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });
        $rootScope.sysSports2.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });
        $rootScope.sysSports3.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });
        $rootScope.sysSports4.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });
        $rootScope.sysSports5.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });
        $rootScope.sysSports6.forEach(function (i){
            if (i.isChecked) {
                finalSportsData.push(i);
            }
        });

        console.log('finalSportsData -- >', finalSportsData);
        // for (var count = 0; count < $scope.intendedStudy.length; count++) {
        //     var finalIntendedStudyObject = {};
        //     finalIntendedStudyObject['collegeIntendedStudyID'] = $scope.intendedStudy[count].collegeIntendedStudyID;
        //     finalIntendedStudyObject['intendedStudyName'] = $scope.intendedStudy[count].intendedStudyName;
        //     finalIntendedStudyObject['intendedStudyType'] = $scope.intendedStudy[count].intendedStudyType;
        //     finalIntendedStudyObject['intendedStudyPercentage'] = $scope.intendedStudy[count].intendedStudyPercentage;

        //     finalIntendedStudyData.push(finalIntendedStudyObject);
        // }
        // console.log('final array IntendedStudy', finalIntendedStudyData);

        editCollegeAPI.saveSportsDetail(finalSportsData)
            .then(
                function(data) {
                    console.log('save detail IntendedStudy====>', data);
                });

    };

    // $scope.$watch('SatData', function (newValue,oldValue){
    //     console.log('newValue',newValue);
    // },true);


    $scope.saveTestScore = function() {      
        var testScoreSatCriticalReading = {
          
            'collegeScoreId': $scope.SatData.CriticalReading.collegeScoreId ? $scope.SatData.CriticalReading.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.CriticalReading.scoreLowerLimit,10) ? parseInt($scope.SatData.CriticalReading.scoreLowerLimit,10) : 0,
            'scoreHigherLimit': parseInt($scope.SatData.CriticalReading.scoreHigherLimit,10) ? parseInt($scope.SatData.CriticalReading.scoreHigherLimit,10) : 0
        }
        var testScoreSatMath = {
            'collegeScoreId': $scope.SatData.math.collegeScoreId ? $scope.SatData.math.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.math.scoreLowerLimit,10) ? parseInt($scope.SatData.math.scoreLowerLimit,10) : 0,
            'scoreHigherLimit': parseInt($scope.SatData.math.scoreHigherLimit,10) ? parseInt($scope.SatData.math.scoreHigherLimit,10) : 0
        }
        var testScoreSatWriting = {
            'collegeScoreId': $scope.SatData.Writing.collegeScoreId ? $scope.SatData.Writing.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.Writing.scoreLowerLimit,10) ? parseInt($scope.SatData.Writing.scoreLowerLimit,10) : 0,
            'satHighWriting': parseInt($scope.SatData.Writing.scoreHigherLimit,10) ? parseInt($scope.SatData.Writing.scoreHigherLimit,10) : 0
        }
        var testScoreActEnglish = {
            'collegeScoreId': $scope.ActData.English.collegeScoreId ? $scope.ActData.English.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.ActData.English.scoreLowerLimit,10) ? parseInt($scope.ActData.English.scoreLowerLimit,10) : 0,
            'scoreHigherLimit': parseInt($scope.ActData.English.scoreHigherLimit,10) ? parseInt($scope.ActData.English.scoreHigherLimit,10) : 0
        }
        var testScoreActMath = {
            'collegeScoreId': $scope.ActData.math.collegeScoreId ? $scope.ActData.math.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.ActData.math.scoreLowerLimit,10) ? parseInt($scope.ActData.math.scoreLowerLimit,10) : 0,
            'scoreHigherLimit': parseInt($scope.ActData.math.scoreHigherLimit,10) ? parseInt($scope.ActData.math.scoreHigherLimit,10) : 0
        }
        var testScoreAverage = {

        }

        var finalTestScoreData = [];

        finalTestScoreData.push(testScoreSatCriticalReading);
        finalTestScoreData.push(testScoreSatMath);
        finalTestScoreData.push(testScoreSatWriting);
        finalTestScoreData.push(testScoreActEnglish);
        finalTestScoreData.push(testScoreActMath);

        $scope.satScore.forEach(function (item) {
            console.log('item',item);
            item.percentage = parseInt(item.percentage,10);
            finalTestScoreData.push(item);
        });
        $scope.actScore.forEach(function (item) {
            console.log('item',item);
            item.percentage = parseInt(item.percentage,10);
            finalTestScoreData.push(item);
        });
        $scope.gpaScore.forEach(function (item) {
            console.log('item',item);
            item.percentage = parseInt(item.percentage,10);
            finalTestScoreData.push(item);
        });

        console.log('testData $scope.satScore data', $scope.satScore);
        console.log("finalTestScoreData===========>",finalTestScoreData);

        editCollegeAPI.saveTestScoreDetail(finalTestScoreData)
            .then(
                function(data) {
                    console.log('save detail Test And Score====>', data);
                });

    };

    $scope.saveAdmission = function() {
        console.log('testData Admission data', $scope.admission);
        var finalAdmissionData = [];

        for (var count = 0; count < $scope.admission.length; count++) {
            var finalAdmissionObject = {};

            finalAdmissionObject['admissionsOptionID'] = $scope.admission[count].admissionsOptionID;
            finalAdmissionObject['optionNameID'] = $scope.admission[count].optionNameID;
            finalAdmissionObject['optionValueID'] = $scope.admission[count].optionValueID;
            finalAdmissionObject['badgeID'] = $scope.admission[count].badgeID;

            console.log(finalAdmissionObject);
            finalAdmissionData.push(finalAdmissionObject);
        }

        console.log('final array admission', finalAdmissionData);

        for (var count = 0; count < $scope.interview.length; count++) {
            var finalInterviewObject = {};
            finalInterviewObject['admissionsOptionID'] = $scope.interview[count].admissionsOptionID;
            finalInterviewObject['optionNameID'] = $scope.interview[count].optionNameID;
            finalInterviewObject['optionValueID'] = $scope.interview[count].optionValueID;
            finalInterviewObject['badgeID'] = $scope.interview[count].badgeID;


            finalAdmissionData.push(finalInterviewObject);
        }

        console.log('final array interview', finalAdmissionData);



        for (var count = 0; count < $scope.interview.length; count++) {
            var finalRecommendationObject = {};
            finalRecommendationObject['admissionsOptionID'] = $scope.recommendation[count].admissionsOptionID;
            finalRecommendationObject['optionNameID'] = $scope.recommendation[count].optionNameID;
            finalRecommendationObject['optionValueID'] = $scope.recommendation[count].optionValueID;
            finalRecommendationObject['badgeID'] = $scope.recommendation[count].badgeID;


            finalAdmissionData.push(finalRecommendationObject);
        }

        console.log('final array recommendation', finalAdmissionData);
        editCollegeAPI.saveAdmissionDetail(finalAdmissionData)
            .then(
                function(data) {
                    console.log('save detail finalAdmissionData====>', data);
                });

    };

    $scope.saveFeesAndFinancial = function() {
        console.log('testData saveFeesAndFinancial data', $scope.feesAndFinancial);
        var finalFeesAndFinancialData = [];

        for (var count = 0; count < $scope.feesAndFinancial.length; count++) {
            var finalFeesAndFinancialObject = {};
            finalFeesAndFinancialObject['collegeFeesID'] = $scope.feesAndFinancial[count].collegeFeesID;
            finalFeesAndFinancialObject['fees'] = $scope.feesAndFinancial[count].fees;


            finalFeesAndFinancialData.push(finalFeesAndFinancialObject);
        }
        console.log('final array FeesAndFinancial', finalFeesAndFinancialData);

        editCollegeAPI.saveFeesAndFinancialDetail(finalFeesAndFinancialData)
            .then(
                function(data) {
                    console.log('save detail FeesAndFinancial====>', data);
                });

    };

    $scope.saveCalendar = function() {
        //console.log('testData Calendar data',$scope.test);
        var finalCalendarData = [];

        for (var count = 0; count < $scope.test.length; count++) {
            var finalCalendarObject = {};
            finalCalendarObject['collegeCalendarId'] = $scope.test[count].collegeCalendarId;
            finalCalendarObject['eventName'] = $scope.test[count].eventName;
            finalCalendarObject['eventDate'] = $scope.test[count].eventDate;
            finalCalendarData.push(finalCalendarObject);
        }

        /* Custom Array from Directive */
        var calendarEventNameArray = $scope.calendarEventNameArray;
        var calendarEventDateArray = $scope.calendarEventDateArray;
        for (var i = 1; i < calendarEventNameArray.length; i++) {
            if (calendarEventNameArray[i] != undefined) {
                var finalCalendarObject = {};
                finalCalendarObject['collegeId'] = $rootScope.colgData['collegeId'];
                finalCalendarObject['eventName'] = calendarEventNameArray[i];
                finalCalendarObject['eventDate'] = calendarEventDateArray[i];

                finalCalendarData.push(finalCalendarObject);
            }
        }

        console.log('final array for calendar', finalCalendarData);

        editCollegeAPI.saveCalendarDetail(finalCalendarData)
            .then(
                function(data) {
                    // console.log('save detail====>', data);
                });

    };


    $scope.saveWeather = function() {

        var finalWeatherData = {
            'weatherId': $scope.weatherObj.weatherId ? $scope.weatherObj.weatherId : null,
            'averageFallLowTemp': $scope.weatherObj.avgFallLowTemp ? $scope.weatherObj.avgFallLowTemp : null,
            'averageFallHighTemp': $scope.weatherObj.avgFallHighTemp ? $scope.weatherObj.avgFallHighTemp : null,
            'averageFallPrecipitation': $scope.weatherObj.avgFallPrecipitation ? $scope.weatherObj.avgFallPrecipitation : null,
            'averageWinterLowTemp': $scope.weatherObj.avgWinterLowTemp ? $scope.weatherObj.avgWinterLowTemp : null,
            'averageWinterHighTemp': $scope.weatherObj.avgWinterHighTemp ? $scope.weatherObj.avgWinterHighTemp : null,
            'averageWinterPrecipitation': $scope.weatherObj.avgWinterPrecipitation ? $scope.weatherObj.avgWinterPrecipitation : null,
            'averageSpringLowTemp': $scope.weatherObj.avgSpringLowTemp ? $scope.weatherObj.avgSpringLowTemp : null,
            'averageSpringHighTemp': $scope.weatherObj.avgSpringHighTemp ? $scope.weatherObj.avgSpringHighTemp : null,
            'averageSpringPrecipitation': $scope.weatherObj.avgSpringPrecipitation ? $scope.weatherObj.avgSpringPrecipitation : null,
            'averageSummerLowTemp': $scope.weatherObj.avgSummerLowTemp ? $scope.weatherObj.avgSummerLowTemp : null,
            'averageSummerHighTemp': $scope.weatherObj.avgSummerHighTemp ? $scope.weatherObj.avgSummerHighTemp : null,
            'averageSummerPrecipitation': $scope.weatherObj.avgSummerPrecipitation ? $scope.weatherObj.avgSummerPrecipitation : null
        }

        editCollegeAPI.saveWeatherDetail(finalWeatherData)
            .then(
                function(data) {
                    console.log('save detail weather====>', data);
                });
    }



    $scope.backCollegeList = function() {

        $scope.colgList = false;
        $scope.editList = true;

    };
    $scope.winter = function() {

        $scope.fallWeather = true;
        $scope.springWeather = true;
        $scope.winterWeather = false;
        $scope.summerWeather = true;
    }
    $scope.spring = function() {

        $scope.fallWeather = true;
        $scope.springWeather = false;
        $scope.winterWeather = true;
        $scope.summerWeather = true;
    }
    $scope.summer = function() {

        $scope.fallWeather = true;
        $scope.springWeather = true;
        $scope.winterWeather = true;
        $scope.summerWeather = false;
    }
    $scope.fall = function() {

        $scope.fallWeather = false;
        $scope.springWeather = true;
        $scope.winterWeather = true;
        $scope.summerWeather = true;
    }

    $scope.menSport = function() {

        $scope.menSports = false;
        $scope.womenSports = true;
    }

    $scope.womenSport = function() {

        $scope.menSports = true;
        $scope.womenSports = false;
    }

    $scope.outStates = function() {

        $scope.outState = false;
        $scope.inState = true;
    }

    $scope.inStates = function() {
        alert("im in instate");
        $scope.outState = true;
        $scope.inState = false;
    }
    $scope.deleteAns = function(count) {
        console.log('count is', count);
        $scope.address.splice(count, 1);
        console.log('$scope.address ---->', $scope.address);
    }
    $scope.deleteProminent = function(count) {
        console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.prominentAlumni.splice(count, 1);
        console.log('$scope.prominentAlumni ---->', $scope.prominentAlumni);
        //}
        //}
    }

    $scope.deleteCollegeRanking = function(count) {
        console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.collegeRanking.splice(count, 1);
        console.log('$scope.collegeRanking ---->', $scope.collegeRanking);
        //}
        //}
    };

    $scope.deleteAddress = function(count) {
        console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.linkAndAddress.splice(count, 1);
        console.log('$scope.linkAndAddress ---->', $scope.linkAndAddress);
        //}
        //}
    }

    $scope.deleteCalendar = function(count) {
        console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.test.splice(count, 1);
        console.log('$scope.test ---->', $scope.test);
        //}
        //}
    }

    $scope.changeAmount = function(ele) {
        console.log(tempFees + '' + $scope.feesAndFinancial);
        var sysFeesStructureID = ele.data.sysFeesStructureID;

        //var inStateData = [1,3,4,5,6];
        //var outStateData = [1,2,4,5,6];
        //var inStateData = [1,3,4,5,6];// tutionOutState = 2
        //var outStateData = [1,2,4,5,6];// tutionInState = 3

        if (sysFeesStructureID == 2 && sysFeesStructureID < 7) {
            var newValue = parseInt($scope.feesAndFinancial[sysFeesStructureID - 1].fees);
            var oldValue = parseInt(tempFees[sysFeesStructureID]);
            var totalOutState = parseInt($scope.feesAndFinancial[6].fees);

            var newFees = totalOutState - oldValue + newValue;
            tempFees[sysFeesStructureID] = newValue;
            $scope.feesAndFinancial[6].fees = newFees;

        } else if (sysFeesStructureID == 3 && sysFeesStructureID < 7) {
            var newValue = parseInt($scope.feesAndFinancial[sysFeesStructureID - 1].fees);
            var oldValue = parseInt(tempFees[sysFeesStructureID]);
            var totalInState = parseInt($scope.feesAndFinancial[7].fees);

            var newFees = totalInState - oldValue + newValue;
            tempFees[sysFeesStructureID] = newValue;
            $scope.feesAndFinancial[7].fees = newFees;

        } else if (sysFeesStructureID < 7) {
            var newValue = parseInt($scope.feesAndFinancial[sysFeesStructureID - 1].fees);
            var oldValue = parseInt(tempFees[sysFeesStructureID]);

            var totalOutState = parseInt($scope.feesAndFinancial[6].fees);
            var totalInState = parseInt($scope.feesAndFinancial[7].fees);

            var newFees = totalOutState - oldValue + newValue;
            tempFees[sysFeesStructureID] = newValue;
            $scope.feesAndFinancial[6].fees = newFees;

            var newFees = totalInState - oldValue + newValue;
            tempFees[sysFeesStructureID] = newValue;
            $scope.feesAndFinancial[7].fees = newFees;
        }
    };

    //create global array of similarSchools
    $scope.similarSchoolsArray = [];
    $scope.addSimilarSchools = function(data, event) {
        console.log('addSimilarSchools======>', data + event);
        //console.log($scope.similarSchoolsArray.indexOf(data.collegeId));
        var index = $scope.similarSchoolsArray.indexOf(data.collegeId);
        if (index == -1) {
            // push to array
            $scope.similarSchoolsArray.push(data.collegeId);
            console.log('pushing in similarSchoolsArray===> ', data.collegeId);
            console.log('similarSchoolsArray===> ', $scope.similarSchoolsArray);
            // background color
            event.target.style.backgroundColor = "#ccc";
        } else {
            // element to remove from array
            $scope.similarSchoolsArray.splice(index, 1);
            // background color
            event.target.style.backgroundColor = "transparent";

            console.log('pop in similarSchoolsArray===> ', data.collegeId);
            console.log('similarSchoolsArray===> ', $scope.similarSchoolsArray);
        }
    }

    $scope.similarSchoolsSelectedArray = [];
    //Right Button Clicked

    $scope.selectedSimilarSchools = function() {

        var similarSchoolsArray = $scope.similarSchoolsArray;
        console.log('selectedSimilarSchools ======>', similarSchoolsArray);

        var similarSchoolColgData = $scope.similarSchoolColgData;

        for (var i = 0; i < similarSchoolsArray.length; i++) {

            console.log('Checking for collegeID ===> ', similarSchoolsArray[i]); // number

            for (var j = 0; j < similarSchoolColgData.length; j++) {
                //console.log(similarSchoolColgData[j].collegeId);
                if (similarSchoolColgData[j].collegeId == similarSchoolsArray[i]) {
                    console.log('Matched ===> ', similarSchoolColgData[j].collegeId + ' ===== ' + similarSchoolsArray[i]);
                    console.log('Matched ===> ', similarSchoolColgData[j].collegeName + ' ===== ' + similarSchoolsArray[i]);
                    // var obj = {};
                    // obj.collegeId = similarSchoolsArray[i];
                    // obj.collegeName = similarSchoolColgData[j].collegeName;

                    $scope.similarSchoolsSelectedArray.push(similarSchoolColgData[j]);
                    $scope.similarSchoolColgData.splice(j, 1);
                }
            };
        }

        $scope.similarSchoolsArray = [];
    };
    // Sed=nd this in APi call -similarSchoolsSelectedArray
    $scope.deleteSelectedSchool = function(item) {
        //alert('delete selected school==>'+ item.collegeId);

        for (var i = 0; i < $scope.similarSchoolsSelectedArray.length; i++) {
            if ($scope.similarSchoolsSelectedArray[i].collegeId == item.collegeId) {
                $scope.similarSchoolsSelectedArray.splice(i, 1);
                $scope.similarSchoolColgData.push(item);
            }
        };

    };

    $scope.saveSimilarSchool = function() {
        //debugger
        //$('body').addClass('page-loader');


        console.log('data finally data', data);
        editCollegeAPI.saveCollegeDetail(similarSchoolsSelectedArray)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });
        //$('body').removeClass('page-loader');

    }

    $scope.getNCAA1SportsData = function(data) {
        console.log('data', data);
    }



}]);

/*-----  End of Controller = CollegeCtrl  ------*/

/*================================================================
Controller = CoursesCtrl
==================================================================*/

app.controller('CoursesCtrl', ['$scope', 'coursesAPI', 'FileuploadAPI', function ($scope,coursesAPI,FileuploadAPI) {

'use strict';
// for tool tip
$('[data-toggle="tooltip"]').tooltip();
$scope.courseName = {};
$scope.courseId = null;
$scope.courseCount = null;
$scope.myFile = '';
// hide and show the side menu options
$scope.displayAddCourse = false;
$scope.displayUploadCourse = false;

$scope.getForm = function(values) {
	console.log('values',values);
	if(values === 1) {
		$scope.displayAddCourse = true;	
		$scope.displayUploadCourse = false;
	} else {
		$scope.displayUploadCourse = true;
		$scope.displayAddCourse = false;
	}
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
};


var getCourses = function () {
	console.log('getClasses-------->');
	$('#loading').addClass('page-loader');
	coursesAPI.getcourseslist()
	.then(
		function (data) {
          if (data !== null) {

            console.log('filter infodata---->',data.length);
            $scope.courseCount = data.length;
            $scope.coursesdata = data;
            $('#loading').removeClass('page-loader');
          }
      }
     );
}();

// open edit list item data
$scope.editListItem = function (listItemValue) {
	console.log('listItemValue',listItemValue);
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
	if(listItemValue != null) {
		 $scope.displayAddCourse = true;
		 $scope.courseId = listItemValue.courseId;
		 $scope.courseName.course = listItemValue.courseName;
		 $scope.courseName.courseDetail = listItemValue.courseDesc;
	}
}

//submit edited list item data
$scope.submitEditList = function () {
var data = 	
	{
		"courseId"   :$scope.courseId,
		"courseName" : $scope.courseName.course,
		"courseDesc" : $scope.courseName.courseDetail
	}
	coursesAPI.editCourseList(data)
	.then(
		function (data) {
          if (data !== null) {
            console.log('filter infodata---->',data);
            $scope.coursesdata = data;
          }
      	}
	);
}


$scope.uploadFile = function($files){
    var file = $scope.myFile;
    console.log('file is ' + JSON.stringify(file));
    FileuploadAPI.uploadFileToUrl();
};

//hide overlay and hide side menu
$scope.hideSideMenu = function() {
	$('#overlay').removeClass('overlay');
	$('#popup3').removeClass('side-menu-open').addClass('side-menu-close');
};
$scope.editCourse = function() {
	$('#overlay').addClass('overlay');
	$('#popup3').removeClass('side-menu-close').addClass('side-menu-open');
};
console.log('Controller ===  CoursesCtrl');
}]);

/*-----  End of Controller = CoursesCtrl  ------*/



/*================================================================
Controller = DashboardCtrl
==================================================================*/


app.controller('DashboardCtrl', ['$scope', '$location', '$rootScope', 'logoutAPI', function ($scope, $location, $rootScope, logoutAPI) {

'use strict';

	console.log('Controller ===  DashboardCtrl');
	$scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  	$scope.data = [300, 500, 100];
  	$scope.name="admin@sourcebits.com";
  	
  	if($.cookie('isSuperAdmin') == 'true') {
  		$rootScope.isSuperAdmin = true;
		$rootScope.isAdmin = false;
    } else {
		$rootScope.isAdmin = true;
		$rootScope.isSuperAdmin = false;
    } 
  	/*select Menu After Page Load*/
  	var absUrl = $location.path();
  	//debugger;
	var pageName = absUrl.replace("/dashboard/","");
	pageName = pageName.trim();
	//debugger;
	switch(pageName) {
		case "home" : 
			$( "ul.nav>a>li" ).eq( 0 ).addClass('active_menu');
			break;
		case "colleges" : 
			$( "ul.nav >a>li" ).eq( 1 ).addClass('active_menu');
			break;
		case "users" : 
			$( "ul.nav>a>li" ).eq( 2 ).addClass('active_menu');
			break;
		case "weather" : 
			$( "ul.nav>a>li" ).eq( 3 ).addClass('active_menu');
			break;
		// case "students" : 
		// 	$( "ul.nav li" ).eq( 5 ).addClass('active_menu');
		// 	break;
		// case "lc" : 
		// 	$( "ul.nav li" ).eq( 6 ).addClass('active_menu');
		// 	break;
		// case "frozen-post" : 
		// 	$( "ul.nav li" ).eq( 7 ).addClass('active_menu');
		// 	break;
		// case "polls" : 
		// 	$( "ul.nav li" ).eq( 8 ).addClass('active_menu');
		// 	break;

		// case "university" : 
		// 	$( "ul.adminList li" ).eq( 2 ).addClass('active_menu');
		// 	break;		
		// case "admin" : 
		// 	$( "ul.adminList li" ).eq( 3 ).addClass('active_menu');
		// 	break;	

		default : $( "ul.nav>a>li" ).eq( 0 ).addClass('active_menu');
				  // $( "ul.adminList li" ).eq( 1 ).addClass('active_menu');
	}

  	/*File Upload*/
  	$scope.onFileSelect = function($files) {
  		console.log('$files=====>',$scope.test);
      	var data, xhr;
      	data = new FormData();
		data.append( 'file', $( '#file' )[0].files[0] );
		console.log('data',data);
		var request = new XMLHttpRequest();
		if(data !== null) {
		    request.open('POST', 'http://httpbin.org/post', /* async = */ false);
		    var formData = data;
		    console.log('formdata---->',formData);
		    request.send(formData);
		    console.log('output is---->',request.response);
		}
	};
	/*Display side panel for home page*/
	$scope.getForm = function(){
		$('#overlay').addClass('overlay');
		$('#popup1').removeClass('side-menu-close').addClass('side-menu-open');
		$('.answer-container').empty();
	};
	/*Remove side panel for home page*/
	$scope.hideSideMenu = function(){
		$('#overlay').removeClass('overlay');
		$('#popup1').removeClass('side-menu-open').addClass('side-menu-close');
	};
	/*Remove overlay&side panel for home page on clicking window*/
	$scope.hideOverlay = function(){
		$('#overlay').removeClass('overlay');
		$('.side-menu-open').removeClass('side-menu-open').addClass('side-menu-close');
		$('.answer-container').empty();
	};

	$scope.isState = 'home';

/*------ Logout API controller -----*/
	$scope.logout = function(){
		$.removeCookie('name', { path: '/' });
		$.removeCookie('isSuperAdmin', { path: '/' });
		logoutAPI.adminlogout()
		.then(
    		function (data) {
    			console.log('data after logout',data);
    			$location.url("/");
			}
        );
	};

}]);

/*-----  End of Controller = DashboardCtrl  ------*/



/*================================================================
Controller = activeMenu
==================================================================*/

app.controller('editCollege', ['$scope', 'editCollegeAPI', function ($scope, editCollegeAPI) {
'use strict';

	$scope.editCollege = function(data) {
	console.log('data is====>',data.collegeId);
	

	editCollegeAPI.adminlogin(data.collegeId)
	.then(
    		function (data) {
    			console.log('data====>',data);
              if (data !== null) {
                console.log('get college details',data);
	          }

	        }
        );
	}

}]);

/*-----  End of controller = activeMenu  ------*/

/*================================================================
=>                  Controller = Forgotpwd
==================================================================*/
/*global app*/

app.controller('ForgotpwdCtrl', ['$scope', 'loginAPI', 'ngProgress', function ($scope, loginAPI, ngProgress) {
	'use strict';
    $scope.resetPassword = { visible: false };
	$scope.statusMsg = '';

    $scope.email = { 
        emailId : ''
    }
    $scope.email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    //2nd Form Data
    $scope.newAccessPasswordModel = '';
    $scope.newPasswordModel = '';
    $scope.newConfirmPasswordModel = '';
    $scope.passwordMatch = ($scope.newConfirmPasswordModel == $scope.newPasswordModel)? true : false;
    

    $scope.$watch(function () { return $scope.newPasswordModel }, changePassword);
    $scope.$watch(function () { return $scope.newConfirmPasswordModel }, changePassword);

    function changePassword(newVal, oldVal) {
        if (newVal != '') {
          $scope.passwordMatch = ($scope.newConfirmPasswordModel == $scope.newPasswordModel)? true : false;
        }
    }

    /* Call Rest Password API from here and pass data  */
    // $scope.newAccessPasswordModel = '';
    // $scope.newPasswordModel = '';
    // $scope.newConfirmPasswordModel = '';
    $scope.setNewPassword = function(){

    }


	 $scope.getPassword = function(isValid) {

        if (!isValid) { //not valid
            //$scope.formValidations1 = true;
            //$scope.statusMsg = '';
            alert('Enter Correct Credentials !!');
        }
        else {
            console.log('$scope.email.emailId',$scope.email.emailId);
            
            ngProgress.start();
            var data = {
                            "emailID" : $scope.email.emailId
                        }

            loginAPI.fgtPwd(data).then(
                function (data) {
                    if (data) {
                        console.log('success',data);
                        //console.log('success',data.statusMsg); not passing status message only passing string
                    //$location.url('/dashboard/home');
                    if(data == "Email doesn't Exixts") {
                        $scope.statusMsg = 'Email Address That you Entered is invalid';
                    } else {
                    	$scope.statusMsg = 'Reset Password Link Sent to your Email Address';
                        $scope.resetPassword.visible   = true; 
                    }
                    ngProgress.complete();
                    };             
                },
	            function (err) {
					console.log('err',err);
				});
        }
    };
	console.log('Controller ===  ForgotpwdCtrl');
   
}]);


/*-----  End of Controller = Forgotpwd  ------*/




/*================================================================
Controller = HomeCtrl
==================================================================*/

app.controller('HomeCtrl', ['$scope', '$location', 'DashboardAPI', '$rootScope', function ($scope, $location, DashboardAPI, $rootScope) {
'use strict';
		
	var getdashboard = function () {
		//$('#loading').addClass('page-loader');

		if($.cookie('isSuperAdmin') == 'true') {
	  		$rootScope.isSuperAdmin = true;
			$rootScope.isAdmin = false;
    	} else {
			$rootScope.isAdmin = true;
			$rootScope.isSuperAdmin = false;
    	} 
		DashboardAPI.getdashboardlist()
		.then(
			function (data) {
				console.log(data)
	          if (data !== null) {
	            $scope.dashboarddata = data;
	            $scope.name = $.cookie('name');
	            console.log('=====>',$.cookie('name'));
	            console.log('values',$scope.dashboarddata);
	          //  $('#loading').removeClass('page-loader');
	          }
	        }
	    );
    }();



	console.log('Controller ===  HomeCtrl');
}]);

/*-----  End of Controller = HomeCtrl  ------*/



/*================================================================
Controller = LcCtrl
==================================================================*/

app.controller('LcCtrl', ['$scope', 'LearninglistAPI', function ($scope, LearninglistAPI) {
	'use strict';

	var getlearningcircle = function () {
		$('#loading').addClass('page-loader');
		LearninglistAPI.getLearninglist ()
		.then(
			function (data){
				if(data !== null){
					console.log('lc data',data);
					$scope.learningcircle = data;
					$scope.noOfLc = data.length;
					$('#loading').removeClass('page-loader');
				}
			}
		);
	}();




	$scope.getForm = function() {
		$('#overlay').addClass('overlay');
		$('#popup6').removeClass('side-menu-close').addClass('side-menu-open');
	};

	//hide overlay and hide side menu
	$scope.hideSideMenu = function() {
		$('#overlay').removeClass('overlay');
		$('#popup6').removeClass('side-menu-open').addClass('side-menu-close');
	};


	$scope.editLearning = function() {
		$('#overlay').addClass('overlay');
		$('#popup6').removeClass('side-menu-close').addClass('side-menu-open');
	};

	console.log('Controller ===  LcCtrl');
}]);

/*-----  End of Controller = LcCtrl  ------*/



/*================================================================
Controller = LoginCtrl
==================================================================*/

app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'loginAPI', 'MasterAPI', 'ngProgress', function ($scope, $rootScope, $location, loginAPI, MasterAPI, ngProgress) {
    'use strict';
    console.log('Controller ===  LoginCtrl');
    $scope.class_status = 0;
    $rootScope.isSuperAdmin = false;
    $rootScope.isAdmin = false;
    $scope.submitForm = function() {
        if ($scope.user != null) {
            $rootScope.userName = $scope.user.userName;
            $.cookie('name', $rootScope.userName);
        }
        // console.log('$scope.user',$rootScope.userName);
        //Login API
        if ($scope.loginForm.$invalid) {
            $scope.formValidations = true;
        }
        else {
            ngProgress.start();
            loginAPI.adminlogin($scope.user)
            .then(function (data) {
               // console.log('stipend login data====>',data);
                //$.cookie('isSuperAdmin', data.superAdmin);
                if (data.loginMessage != "Success") {
                    $scope.loginFailed = 'Please Enter Correct Login and Password';     
                } else {
                   // console.log('data after login',data);
                    // MasterAPI Start
                    MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    });
                // MasterAPI End
                    $location.url('/dashboard/home');
                    ngProgress.complete();
                }             
            },
            function (err) {
                //$scope.loginFailed = 'Server is Down';     
                console.log('error');
            });
        }
    };

    /*-----  Pressing enter key to login hte page  ------*/
    $(document).keypress(function(e){
    if (e.which == 13){
    $scope.submitForm();
    }
    });

}]);

/*-----  End of Controller = LoginCtrl  ------*/



/*================================================================
Controller = MainCtrl
==================================================================*/

app.controller('MainCtrl', ['$scope', '$location', 'MasterAPI', '$rootScope', function ($scope, $location, MasterAPI, $rootScope) {
'use strict';

	console.log('Controller ===  MainCtrl');
	$rootScope.dropDownData = '';
	 MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    $rootScope.colgType = data['SysCollegetype'];
                    console.log('$rootScope.colgType',$rootScope.colgType);
                    $rootScope.colgArea = data['SysCollegeArea'];
                    console.log('$rootScope.colgArea',$rootScope.colgArea);
                    $rootScope.accessType = data['SysAccessType'];
                    console.log('$rootScope.accessType',$rootScope.accessType);
                    $rootScope.admissionVal = data['SysAdmissionOptionValue'];
                    console.log('$rootScope.admissionVal',$rootScope.admissionVal);
                    $rootScope.admissionBadge = data['SysAdmissionBadge'];
                    console.log('$rootScope.admissionBadge',$rootScope.admissionBadge);
                    $rootScope.sysSports = data['SysSports'];
                    $rootScope.sysSports2 = angular.copy(data['SysSports']);
                    $rootScope.sysSports3 = angular.copy(data['SysSports']);
                    $rootScope.sysSports4 = angular.copy(data['SysSports']);
                    $rootScope.sysSports5 = angular.copy(data['SysSports']);
                    $rootScope.sysSports6 = angular.copy(data['SysSports']);

                    console.log('$rootScope.sysSports',$rootScope.sysSports);

                    });
  $scope.labelsOfGraph =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.dataOfGraph = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
	// $scope.getPage = function(values) {
	// 	console.log('values is ',values);
	// 	switch(values){
	// 		case 1 : $location.url('/dashboard/home');
	// 				 break;
	// 		case 2 : $location.url('/dashboard/univesity');
	// 				 break;		 	
	// 	}
	// };
}]);

/*-----  End of Controller = MainCtrl  ------*/



/*================================================================
Directive = activeMenu
==================================================================*/

app.directive('activeMenu', ['$rootScope', function ($rootScope) {
'use strict';

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			$(element).on('click', function () {
				//debugger;
				// $(element).siblings().removeClass('active_menu');
				// $(element).addClass('active_menu');
				var prevClassName = $(element).siblings().find('li.active_menu>div').attr('class');
				//$(element).siblings().find('li.active_menu>div').removeClass(prevClassName+'-active').addClass(currentClass);
				$(element).siblings().find('li').removeClass('active_menu');
				$(element).find('li').addClass('active_menu');
				//var prevClassName = $(element).find('li>div').attr('class');
				console.log('currentClassName -->', currentClassName);
				var checkImageStatus = currentClassName.search("-active");
				
				console.log('prevClassName',prevClassName);
				//$(element).siblings().find('li>div').
				//debugger;
				if(checkImageStatus == -1) {
					$(element).find('div').removeClass(currentClassName).addClass(currentClassName+'-active');
				} else {
					var currentClass = currentClassName.substr(0,checkImageStatus);
					
				}
				

			});
		}
	};

}]);

/*-----  End of Directive = activeMenu  ------*/
/*================================================================
Directive = addAddress
==================================================================*/
/*global app,$*/
app.directive('addAddress', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.websiteNameArray = [];
            scope.websiteURLArray = [];
            $(element).on('click', function() {
                counter++;
                var address = $compile('<div class="form-group college-address-div-' + counter + '">'+
                    '<div class="col-xs-5">'+
                        '<input type="text" class="form-control" placeholder="Enter Here" ng-model="websiteNameArray[' + counter + ']" id="collegeAddress-' + counter + '"/>'+
                    '</div>'+
                    '<div class="col-xs-5">'+
                        '<input type="text" class="form-control" placeholder="Enter Here" ng-model="websiteURLArray[' + counter + ']" id="collegeAddress-' + counter + '"/>'+
                    '</div>'+
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedLinkAndAddress(' + counter + ')">X</div></div>')(scope);
                $('.college-address').append(address);
                $('#collegeAddress-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addAddress');
        }
    };

}]);

/*-----  End of Directive = addAddress  ------*/

/*================================================================
Directive = addAnswer
==================================================================*/
/*global app,$*/
app.directive('addAnswer', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.ans = [];
            $(element).on('click', function() {
                counter++;
                var inputEle = $compile('<div class="form-group answer-div-' + counter + '"><div class="col-xs-10"><input type="text" class="form-control" placeholder="Enter Here" ng-model="ans[' + counter + ']" id="answer-' + counter + '"/></div><div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedAns(' + counter + ')">X</div></div>')(scope);
                $('.answer-container').append(inputEle);
                $('#answer-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            //<div class="form-group answer-div-'+counter+'"><div class="col-xs-1"><input type="checkbox" name="ans-'+counter+'" id="ans--'+counter+'"></div><div class="col-xs-8"><input type="text" class="form-control" placeholder="Enter Answer Here" ng-model="ans['+counter+']" id="answer-'+counter+'"/></div><div style="cursor: pointer;  margin: 9px 2px;" class="col-xs-1 closeLang'+counter+'" ng-click="delSelectedAns('+counter+')">X</div></div>
            /*$('div').on('click', '.closeLang', function ($event) {
				console.log('$event',$event);
		        $event.preventDefault();
		         $(this).parent().prev().prev().remove();
		         $(this).parent().prev().remove();
		        $(this).parent().remove();
    		});*/

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addAnswer');
        }
    };

}]);

/*-----  End of Directive = addAnswer  ------*/

/*================================================================
Directive = addCalendar
==================================================================*/
/*global app,$*/
app.directive('addCalendar', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.calendarEventNameArray = [];
            scope.calendarEventDateArray = [];
            $(element).on('click', function() {
                counter++;
                var test = $compile('<div class="form-group calendar-div-' + counter + '">'+
                   '<div class="col-sm-5"> <div class="form-group"><label for="calendarEventName" class="col-sm-5 control-label lable-font">Event Name</label>'+
                    '<div class="col-sm-7"><input type="text" class="form-control" placeholder="Enter Here" ng-model="calendarEventNameArray[' + counter + ']" id="calendarEventName-' + counter + '"/>'+
                    '</div></div></div>'+

                    '<div class="col-sm-5"><div class="form-group"><label for="calendarEventDate" class="col-sm-5 control-label lable-font">Event Date</label>'+
                                '<div class="col-sm-7"><input type="text" class="form-control" placeholder="Enter Here" ng-model="calendarEventDateArray[' + counter + ']" id="calendarEventDate-' + counter + '"/>'+
                    '</div></div></div>'+
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedCalendar(' + counter + ')">X</div>'+
                    '</div>')(scope);
                $('.calendar-div').append(test);
                $('#eventCalendar-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });


                


            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addCalendar');
        }
    };

}]);

/*-----  End of Directive = addCalendar  ------*/

/*================================================================
Directive = addCollegeRanking
==================================================================*/
/*global app,$*/
app.directive('addCollegeRanking', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.clgRankingArray = [];
            scope.clgRankingPointsArray = [];
            $(element).on('click', function() {
                counter++;
                var clgRank = $compile('<div class="form-group college-ranking-' + counter + '">' +
                    '<div class="col-xs-5">' +
                    '<input type="text" class="form-control" placeholder="Enter Here" ng-model="clgRankingArray[' + counter + ']" id="rank-' + counter + '"/>' +
                    '</div>' +
                    '<div class="col-xs-5">' +
                    '<input type="text" class="form-control" placeholder="Enter Here" ng-model="clgRankingPointsArray[' + counter + ']" id="rank-' + counter + '"/>' +
                    '</div>' +
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedCollegeRanking(' + counter + ')">X</div></div>')(scope);
                $('.college-ranking').append(clgRank);
                $('#rank-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addCollegeRanking');
        }
    };

}]);

/*-----  End of Directive = addCollegeRanking  ------*/

/*================================================================
Directive = addProminent
==================================================================*/
/*global app,$*/
app.directive('addProminent', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.prominentArray = [];
            $(element).on('click', function() {
                counter++;
                var prominentAlumni = $compile('<div class="form-group prominent-alumni-div-' + counter + '"><div class="col-xs-10"><input type="text" class="form-control" placeholder="Enter Here" ng-model="prominentArray[' + counter + ']" id="promp-' + counter + '"/></div><div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedProminent(' + counter + ')">X</div></div>')(scope);
                $('.prominent-alumni').append(prominentAlumni);
                $('#promp-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addProminent');
        }
    };

}]);

/*-----  End of Directive = addProminent  ------*/

// /*================================================================
// Directive = datepicker
// ==================================================================*/
// /*global app,$*/

// app.directive('dateTimePicker', ['$rootScope', function ($rootScope) {
// 'use strict';

// 	return {
// 		restrict: 'A',
// 		link: function (scope, element, attrs) {
// 			    $( "#datepicker" ).datepicker({
// 			      changeMonth: true,
// 			      changeYear: true
// 			    });
			 
// 			// $(element).on('click', function() {
// 			// 	console.log('m in date picker');
// 			// 	// var ngModel = $(this).attr('ng-model'); //getting ng-model name
// 			// 	// console.log(event.target.value)
// 			// 	// scope[ngModel] = event.target.value; //update the new value to ng-model
// 			// 	// scope.$apply();
// 			// 	$(element).datepicker( );
// 			// });
			
// 			console.log('Directive === datepicker');
// 		}

// 	};

// }]);


// /*-----  End of Directive = datepicker  ------*/



/*================================================================
Directive = calendarRepeatDirecitve
==================================================================*/
/*global app,$*/
app.directive('myPostRepeatDirective', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';
    var counter = 0;
  return function(scope, element, attrs) {
    
    ++counter;
    // console.log(scope.data);
    var ele = element.find('input')[1];
    ele.id = ele.id +''+counter;
    $('#'+ele.id).datepicker({
			      changeMonth: true,
			      changeYear: true,
			      dateFormat: 'yy-mm-dd'
			    });
  };
}]);

/*-----  End of Directive = calendarRepeatDirecitve  ------*/

/*================================================================
Directive = editcollege
==================================================================*/
/*global app,$*/
app.directive('editcollege', ['$rootScope', function ($rootScope) {
'use strict';	

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			
			(function() {
			    $( "#accordion" ).accordion({
			      collapsible: true,
			      heightStyle: "content",
			      autoHeight: false,
    			  navigation: true
			    });
			  })();
			
			console.log('Directive === edit_college');
			$(function() {
			    $( "#tabs" ).tabs();
			  });
		}


	};

}]);


/*-----  End of Directive = editcollege  ------*/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
/*================================================================
Directive = graphCanvasRefresh
==================================================================*/
/*global app,$*/
app.directive('graphCanvasRefresh', ['$compile', function($compile) {
function link(scope, elem, attrs) {


console.log('scope graphCanvasRefresh',scope.data);
    function refreshDOM() {
        var markup = '<canvas class="chart chart-pie" height="100" width="100" id="graph" data="data" labels="labels" legend="true" colours="graphColours" ></canvas>';
        var el = angular.element(markup);
        compiled = $compile(el);
        elem.html('');
        elem.append(el);
        compiled(scope);
    };

    // Refresh the DOM when the attribute value is changed
    scope.$watch(attrs.graphCanvasRefresh, function(value) {
        refreshDOM();
    });

    // Clean the DOM on destroy
    scope.$on('$destroy', function() {
        elem.html('');
    });
};

return  {
    link: link
};
}]);
/*-----  End of Directive = graphCanvasRefresh  ------*/
/*================================================================
Filter = convertMiliSecondsIntoDate
==================================================================*/

app.filter('convertMiliSecondsIntoDate', function () {
	'use strict';

	return function (input) {

		var mydate = new Date(input);
			//finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			//console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			var month = mydate.getMonth();
			//month = month.parseInt();
			month = month +1;
			mydate = mydate.getDate()+'/'+ month  +'/'+ mydate.getUTCFullYear();
			console.log('mydate',mydate);	
			return mydate;
		console.log('Filter == convertMiliSecondsIntoDate');

		
	};
});

app.filter('convertMiliSecondsIntoDate1', function () {
	'use strict';

	return function (input) {

		var mydate = new Date(input);
			//finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			//console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			var month = mydate.getMonth();
			//month = month.parseInt();
			month = month +1;
			mydate = mydate.getDate()+'/'+ month  +'/'+ mydate.getUTCFullYear();
			console.log('mydate',mydate);	
			return mydate;
		console.log('Filter == convertMiliSecondsIntoDate');

		
	};
});

/*-----  End of Filter = convertMiliSecondsIntoDate  ------*/

/*================================================================
=>                   Filter = remainingTime
==================================================================*/
/*global app*/

app.filter('remainingTime', function () {
	
	'use strict';

	return function (data) {
		//var dateDiff = 0;
		var finalDate = 0;
		//for(var count = 0; count < data.length; count++) {
			//dateDiff = data[count].endDate - data[count].startDate;
			//console.log(dateDiff);
			var mydate = new Date(data);
			console.log('mydate',mydate);
			finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			console.log('finalDate',finalDate);
			return finalDate;
		//console.log('in filter ',data);
		
	};
});


/*-----  End of Filter = remainingTime  ------*/
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
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

/*================================================================
=>                   Service = classesAPI
==================================================================*/
/*global app, $http*/

app.service('classviewAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getclassview = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonClassesList';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};
	
	this.getCourseAndStudent = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonAddClasses1';
		


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


/*-----  End of Service = classesAPI  ------*/




/*================================================================
=>                   Service = FacultylistAPI
==================================================================*/
/*global app, $http*/

app.service('CollegeAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getcollegelist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/listOfColleges';
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				alert('Unable to load list of colleges..');
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = FacultylistAPI  ------*/




/*================================================================
=>                   Service = coursesAPI
==================================================================*/
/*global app, $http*/

app.service('coursesAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getcourseslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonCoursesByClassAndStudentsView';
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.editCourseList = function (contentdata) {
		console.log('contentdata======>',contentdata);
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonEditCourses';
		$http.post(serviceUrl,contentdata)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;

	};

}]);


/*-----  End of Service = classesAPI  ------*/




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

        var uploadUrl = appConfig.baseURL + '/' +requestType;
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




/*================================================================
=>                   Service = FrozenpostlistAPI
==================================================================*/
/*global app, $http*/

app.service('FrozenpostlistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getfrozenpostlist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonFrozenSummaryView';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getclasslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonAddFrozenList';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.submitFrozenPost = function (data) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateFrozenList';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};


	this.editFrozenList = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateFrozenList';
		
		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.deleteFrozenList = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonDeactivateFrozenList';
		
		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};


}]);


/*-----  End of Service = FrozenpostlistAPI  ------*/




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
		var serviceUrl = appConfig.baseURL + '/forgotPassword/'+ data.emailID +'/';

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


/*-----  End of Service = loginAPI  ------*/




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




/*================================================================
=>                   Service = pollslistAPI
==================================================================*/
/*global app, $http*/

app.service('PollslistAPI', ['$rootScope', '$q', 'appConfig', '$http', function ($rootScope, $q, appConfig, $http) {

	'use strict';

	this.getpollslist = function () {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSurvey';
		


		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.submitPollsDetails = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonSaveOrUpdateSurvey';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.deactivatePollsDetails = function (data) {
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/jsonDeactivateSurvey';
		


		$http.post(serviceUrl,data)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

}]);


/*-----  End of Service = pollslistAPI  ------*/




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