

/*================================================================
App stipend
==================================================================*/
'use strict';

var app = angular.module('stipend', ['ngRoute', 'chart.js', 'ui.router', 'ngProgress', 'angularFileUpload', 'ngDialog', 'angularSpinner']);

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
        .state('dashboard.fileupload',  {
            url: '/fileupload',
            requiredLogin: true,              
            templateUrl: 'partials/templates/fileupload.html'   
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
        .state('resetPassword',  {
            url: '/resetPassword',
             //equiredLogin: true,                     
            templateUrl: 'partials/templates/resetPassword.html'   
            //controller: 'ItemsCrtl'     
        })
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

        // .state('emailFormat',  {
        //     url: '/emailFormat',
        //     //requiredLogin: true,                     
        //     templateUrl: 'partials/templates/emailFormat.html'   
        //     //controller: 'ItemsCrtl'     
        // });

        $urlRouterProvider.otherwise('/');

        // This is required for Browser Sync to work poperly
        // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


}]);



app.run(['$rootScope', '$state', '$location', '$window', function ($rootScope, $state, $location, $window) {
    
    'use strict';

    // console.log('Angular.js run() function...');

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.currentState = toState.name;
        
        // console.log('state --->', toState.name,$.cookie('NAME'));
        
        if (toState.requiredLogin && !isLoggedIn()) {
              location.href = '/';
        } 
        else {
             $rootScope.currentState = toState.name;
        }    
                   
    });

    var isLoggedIn = function () {
        if ($.cookie('NAME')) {
            return true;
        } else {
            return false;
        }
    };

    // var isLoggedIn = function () {
    //     if ($.cookie('NAME') != undefined) {
    //         var accessId = $.cookie('NAME');
    //         return  (!accessId) ? false : true;
    //     }
    //     else {
    //         event.preventDefault();
    //         $location.url('/');
    //     }
    // };

    
}]);



app.constant('appConfig', {

    
    //baseURL : 'http://192.168.10.229:8080/stipendadmin'
    // baseURL : 'http://ec2-52-10-5-217.us-west-2.compute.amazonaws.com:8080/Stipend' 
    // baseURL : 'http://mystipendappelasticloadbalancer-178615218.us-west-2.elb.amazonaws.com:8080/Stipend'
    baseURL:'http://mystipendappelasticloadbalancer-178615218.us-west-2.elb.amazonaws.com:8080/Stipend'
    // baseURL : 'http://192.168.11.134:8085/Stipend'
    
});

/*================================================================
Controller = CollegeCtrl
==================================================================*/

app.controller('CollegeCtrl', ['$scope', 'CollegeAPI', 'editCollegeAPI', '$rootScope', 'usSpinnerService', function($scope, CollegeAPI, editCollegeAPI, $rootScope, usSpinnerService) {
    'use strict';
    var inStateData = [1, 3, 4, 5, 6];
    var outStateData = [1, 2, 4, 5, 6];
    var tempFees = {};
    var k = 0;
    $scope.query = {};
    $scope.query1 = {};
    $scope.queryBy = '$';
    $scope.queryBy1 = '$';

    $scope.colgList = false;
    $scope.editList = true;
    $scope.searchList = true;

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

    $scope.weatherObj = {

    };


    $scope.delSelectedAns = function(count) {

        // console.log('i m here in count', count);
        // console.log('$scope.ans', $scope.ans);
        $('.answer-div-' + count).remove();
        //$scope.ans.splice(count,1);
        // console.log('$scope.ans', $scope.ans);
        //$scope.ans.splice(count,1);
        delete $scope.ans[count]

    };

    $scope.delSelectedProminent = function(count) {

        // console.log('i m here in count', count);
        // console.log('$scope.prominentArray', $scope.prominentArray);
        $('.prominent-alumni-div-' + count).remove();
        // console.log('$scope.prominentArray', $scope.prominentArray);
        delete $scope.prominentArray[count]

    };

    $scope.delSelectedCollegeRanking = function(count) {

        // console.log('i m here in count', count);
        // console.log('$scope.clgRankingArray', $scope.clgRankingArray);
        // console.log('$scope.clgRankingPointsArray', $scope.clgRankingPointsArray);
        $('.college-ranking-' + count).remove();
        delete $scope.clgRankingArray[count];
        delete $scope.clgRankingPointsArray[count]

    };

    // $scope.delSelectedLinkAndAddress = function(count) {

    //     console.log('i m here in count', count);
    //     console.log('$scope.websiteNameArray', $scope.websiteNameArray);
    //     $('.college-address-div-' + count).remove();
    //     console.log('$scope.websiteNameArray', $scope.websiteNameArray);
    //     delete $scope.websiteNameArray[count];
    //     delete $scope.websiteURLArray[count];

    // };

    $scope.delSelectedCalendar = function(count) {

        // console.log('i m here in count', count);
        // console.log('$scope.calendarEventNameArray', $scope.calendarEventNameArray);
        $('.calendar-div-' + count).remove();
        // console.log('$scope.calendarEventNameArray', $scope.calendarEventNameArray);
        //delete $scope.calendarArray[count]
        delete $scope.calendarEventNameArray[count];
        delete $scope.calendarEventDateArray[count];

    };

    console.log($.cookie());


    $scope.getcollege = function(state) {
        //$('body').addClass('page-loader');
        // usSpinnerService.spin('spinner-1');
        var page;
        if (!isNaN(state)) {
            $scope.collegeState = state;
            page = {
                'off': ($scope.collegeState - 1) * 100,
                'size': 100
            };
        }
        if (state == 'next') {
            $scope.collegeState = $scope.collegeState + 1;
            page = {
                'off': ($scope.collegeState - 1) * 100,
                'size': 100
            };
        } else if (state == 'prev') {
            $scope.collegeState = $scope.collegeState - 1;
            page = {
                'off': ($scope.collegeState - 1) * 100,
                'size': 100
            };
        }
        if (state == 'initial') {
            page = {
                'off': 0,
                'size': 100
            };
        }
        CollegeAPI.getcollegelist(page)
            .then(
                function(data) {
                    // console.log('user data====>', data);
                    if (state == 'initial') {
                        $scope.collegeState = 1;
                        $scope.collegeCount = (data.Colleges.length + data.RemainingColleges);
                        var count = Math.ceil((data.Colleges.length + data.RemainingColleges) / 100);
                        // console.log('count', count);
                        $scope.totalCount = [];
                        // $scope.totalCount = new Array(count);
                        for (var i = 1; i <= count; i++) {
                            $scope.totalCount.push(i);
                        }
                    }
                    if (data !== null) {
                        $scope.collegedata = data.Colleges;
                        $scope.similarSchoolColgData = data;
                        // $scope.collegeCount = data.length;

                    }
                    // usSpinnerService.stop('spinner-1');
                    if ($scope.collegeState == $scope.totalCount.length) {
                        $scope.collegeCountShown = $scope.collegeCount;

                    } else {
                        $scope.collegeCountShown = $scope.collegeState * 100;

                    }
                }
            );
    };
    $scope.getcollege('initial');



    $scope.getUsers = function(state) {
        //$('body').addClass('page-loader');
        $scope.userList = false;
        $scope.userSearch = true;
        var page;
        if (!isNaN(state)) {
            $scope.pageState = state;
            page = {
                'off': ($scope.pageState - 1) * 100,
                'size': 100
            };
        }
        if (state == 'next') {
            $scope.pageState = $scope.pageState + 1;
            page = {
                'off': ($scope.pageState - 1) * 100,
                'size': 100
            };
        } else if (state == 'prev') {
            $scope.pageState = $scope.pageState - 1;
            page = {
                'off': ($scope.pageState - 1) * 100,
                'size': 100
            };
        }
        if (state == 'initial') {
            page = {
                'off': 0,
                'size': 100
            };
        }
        CollegeAPI.getUserslist(page)
            .then(
                function(data) {
                    // console.log('user data====>', data);
                    if (state == 'initial') {
                        $scope.pageState = 1;
                        $scope.usersCount = (data.Users.length + data.RemainingUsers);
                        var count = Math.ceil((data.Users.length + data.RemainingUsers) / 100);

                        // console.log('count', count);
                        $scope.totalCountUsers = [];
                        // $scope.totalCountUsers = new Array(count);
                        for (var i = 1; i <= count; i++) {
                            $scope.totalCountUsers.push(i);
                        }
                    }
                    if (data !== null) {
                        $scope.userdata = data.Users;

                    }
                    usSpinnerService.stop('spinner-1');
                    // console.log('totalCountUsers', $scope.totalCountUsers);
                    if ($scope.pageState == $scope.totalCountUsers.length) {
                        $scope.userCountShown = $scope.usersCount;

                    } else {
                        $scope.userCountShown = $scope.pageState * 100;

                    }

                }
            );
    };
    $scope.getUsers('initial');
    // $scope.$watch('pageState',function (newValue) {
    //     console.log('------>> newValue',newValue);
    // })


    $scope.getSimilarCollege = function() {
        // usSpinnerService.spin('spinner-1');
        // console.log('getSimilarCollege------>', $scope.collegeCount);
        var page = {
                'off': 0,
                'size': $scope.collegeCount
            }
            //$('body').addClass('page-loader');
        CollegeAPI.getSimilarSchoollist(page)
            .then(
                function(data) {
                    console.log('data====>', data);
                    if (data !== null) {
                        $scope.similarCollegeData = data.Colleges;
                        $scope.similarCollegeData = _.sortByOrder($scope.similarCollegeData, ['collegeName'], ['asc']);
                        $scope.similarSchoolColgData = data;

                        //$('body').removeClass('page-loader');
                        // $scope.FacultyName = data.firstName + data.lastName;
                        // console.log('similar school data---->', $scope.similarCollegeData)
                    }
                    // usSpinnerService.stop('spinner-1');
                }
            );
    };

$scope.deleteUser = function(data) {
        //debugger
        
        var delUser = [{
            "userId":data.userId
        }];


        console.log('data delete User', data);
        editCollegeAPI.deleteUserList(delUser)
            .then(
                function(data) {
                    $scope.getUsers('initial');
                    console.log('save Delete user====>', data);
                    
                });
            
    };

    $scope.editCollege = function(data) {
        //$('body').addClass('page-loader');
        usSpinnerService.spin('spinner-1');
        $scope.getSimilarCollege();

        console.log('data is in ====>', data);
        $rootScope.colgData = data;
        editCollegeAPI.editcollegelist(data.collegeId)
            .then(
                function(data) {
                    console.log('data Edit College====>', data);
                    if (data !== null) {
                        try {

                            $scope.colgList = true;
                            $scope.editList = false;
                            $scope.searchList = true;
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

                            $scope.freshman.enrollmentID = data['FreshmanProfile']['Profile'].enrollmentStatusId;
                            $scope.freshman.totApplicants = data['FreshmanProfile']['Profile'].totalApplicants;
                            $scope.freshman.totAccepted = data['FreshmanProfile']['Profile'].totalAccepted;
                            $scope.freshman.xptanceRate = data['FreshmanProfile']['Profile'].acceptanceRate;
                            $scope.freshman.totEnrolled = data['FreshmanProfile']['Profile'].totalEnrolled;
                            $scope.freshman.earlyDecision = data['FreshmanProfile']['Profile'].percentageEnrolledEarlyDecision;
                            $scope.freshman.waitingList = data['FreshmanProfile']['Profile'].percentageEnrolledFromWaitList;
                            $scope.freshman.outFState = data['FreshmanProfile']['Profile'].percentageEnrolledOutofState;
                            $scope.freshman.ernPiblicHS = data['FreshmanProfile']['Profile'].percentageEnrolledPublicHs;
                            $scope.freshman.rcvFinanceAid = data['FreshmanProfile']['Profile'].percentageReceivingFinancialAid;
                            $scope.freshman.avgFinanceAid = data['FreshmanProfile']['Profile'].averageFinancialAid;
                            $scope.freshman.malePer = data['FreshmanProfile']['Profile'].malePercentage;
                            $scope.freshman.religiousAffiliation = data['FreshmanProfile']['Profile'].religiousAffiliation;
                            $scope.freshman.femalePer = data['FreshmanProfile']['Profile'].femalePercentage;
                            $scope.freshman.collegeEthnicityID = data['FreshmanProfile']['CollegeEthnicity'].collegeEthnicityID;

                            $scope.mostRepresentedState = data.FreshmanProfile.MostRepresentedStates;


                            // $scope.mostRepresentedState['stateArray'] = [];
                            // for(var key in $scope.mostRepresentedState) {
                            //     console.log('key',key);
                            //     if (key.match('stateId')) {
                            //         var obj = {'id':key,'value':$scope.mostRepresentedState[key]};
                            //         $scope.mostRepresentedState.stateArray.push(obj);
                            //     }
                            // };

                            $scope.weatherObj.avgFallLowTemp = data['Weather'];
                            $scope.quickfact = data.QuickFacts;

                            $scope.geoData = data['FreshmanProfile']['Geographics'];
                            $scope.clgEthenicity = data['FreshmanProfile']['CollegeEthnicity'];
                            $scope.intendedStudy = data['IntendedStudy']['Study'];
                            $scope.studentFacultyRatio = data['IntendedStudy'];
                            $scope.teamName = data['Sports'];
                            $scope.intendedStudyOption = data['IntendedStudy']['IntendedStudyOption'];
                            $scope.admission = data['Admissions']['Admission'];
                            $scope.interview = data['Admissions']['Interviews'];
                            $scope.recommendation = data['Admissions']['Recommendations'];
                            $scope.intramurals = data['Sports']['intramurals'];
                            $scope.admissionCode = data.Admissions.AdmissionCodes;

                            $scope.SatData = data.TestScoresAndGrades.SAT;
                            $scope.ActData = data.TestScoresAndGrades.ACT;
                            // $scope.averageScore =  data.TestScoresAndGrades.TestScoresAndGrades;

                            $scope.testScoreAvg = data.TestScoresAndGrades.Averages;


                            $scope.sports = data.Sports;

                            $scope.actScore = data['TestScoresAndGrades']['ACTSCORES'];

                            $scope.criticalReading = data['TestScoresAndGrades']['SATSCORES']['CriticalReading'];
                            $scope.sATMathPercentage = data['TestScoresAndGrades']['SATSCORES']['SATMathPercentage'];
                            $scope.sATWritingPercentage = data['TestScoresAndGrades']['SATSCORES']['SATWritingPercentage'];

                            $scope.gpaScore = data['TestScoresAndGrades']['GPASCORES'];

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

                            $scope.feesAndFinancial = data.FeesAndFinancialAids.Fees;

                            $scope.AvgFees = data.FeesAndFinancialAids;


                            var dataFees = data.FeesAndFinancialAids.Fees;

                            for (var i = 0; i < dataFees.length; i++) {
                                tempFees[dataFees[i].sysFeesStructureID] = dataFees[i].fees;
                            };


                            $scope.test = data.Calender;
                            $scope.similarArray = [];
                            $scope.collegeRanking = data.CollegeRanking;
                            $scope.prominentAlumni = data.ProminentAlumini;
                            $scope.similerSchool = data.SimilarSchools;
                            $scope.similerSchool.forEach(function(item) {
                                $scope.similarArray.push(item.similarSchoolsID);
                                // console.log('$scope.similarArray',$scope.similarArray);
                            })


                            // console.log('scope.similarCollegeDatasimilarCollegeDatasimilarCollegeDatasimilarCollegeData', $scope.similarCollegeData);
                            $scope.linkAndAddress = data.LinksAndAddresses;



                            $scope.sportsChecked = {
                                'menChecked': {},
                                'womenChecked': {},
                                'men': {},
                                'women': {},
                                'menDivisions': [],
                                'womenDivisions': []
                            };


                            // for(var key in data.Sports.Divisions.Men) {
                            //     // console.log('--->',key);
                            //     $scope.sportsChecked.men[key] = [];
                            //     $scope.sportsChecked.menChecked[key] = [];

                            //     // $scope.sportsChecked.menDivisions.push(key);
                            //     data.Sports.Divisions.Men[key].forEach(function (i) {
                            //         $scope.sportsChecked.menChecked[key].push(i.syssportsId);
                            //     })
                            //     // data.Sports.Divisions.Men[key];
                            // }
                            $rootScope.sportsDivisions.forEach(function(div) {

                                $scope.sportsChecked.men[div.divisionName] = [];
                                $scope.sportsChecked.menChecked[div.divisionName] = [];
                                if (data.Sports.Divisions.Men[div.divisionName]) {
                                    data.Sports.Divisions.Men[div.divisionName].forEach(function(i) {
                                        $scope.sportsChecked.menChecked[div.divisionName].push(i.syssportsId);
                                    })
                                }
                                $scope.sportsChecked.menDivisions.push({
                                    'name': div.divisionName,
                                    'divisionID': div.sysSportsDivisionID
                                });

                                $scope.sportsChecked.women[div.divisionName] = [];
                                $scope.sportsChecked.womenChecked[div.divisionName] = [];
                                if (data.Sports.Divisions.Women[div.divisionName]) {
                                    data.Sports.Divisions.Women[div.divisionName].forEach(function(i) {
                                        $scope.sportsChecked.womenChecked[div.divisionName].push(i.syssportsId);
                                    })
                                }
                                $scope.sportsChecked.womenDivisions.push({
                                    'name': div.divisionName,
                                    'divisionID': div.sysSportsDivisionID
                                });
                            })

                            $scope.sportsChecked.menDivisions.forEach(function(divisions) {
                                // console.log('divison', divisions);
                                $scope.sportsChecked.men[divisions.name] = [];
                                $rootScope.sysSports.forEach(function(sports) {
                                    $scope.sportsChecked.men[divisions.name].push({
                                        'syssportsId': sports.syssportsId,
                                        'syssportsName': sports.syssportsName,
                                        'is_checked': false,
                                        'sysSportsDivisionID': divisions.divisionID,
                                        'genderId': '1',
                                        'collegeId': $rootScope.colgData.collegeId
                                    });
                                    $scope.sportsChecked.men[divisions.name].forEach(function(customSports) {
                                        if ($scope.sportsChecked.menChecked[divisions.name].indexOf(customSports.syssportsId) > -1) {
                                            customSports.is_checked = true;
                                        }
                                    })
                                })
                            })

                            $scope.sportsChecked.womenDivisions.forEach(function(divisions) {
                                // console.log('divison', divisions);
                                $scope.sportsChecked.women[divisions.name] = [];
                                $rootScope.sysSports.forEach(function(sports) {
                                    $scope.sportsChecked.women[divisions.name].push({
                                        'syssportsId': sports.syssportsId,
                                        'syssportsName': sports.syssportsName,
                                        'is_checked': false,
                                        'sysSportsDivisionID': divisions.divisionID,
                                        'genderId': '2',
                                        'collegeId': $rootScope.colgData.collegeId
                                    });
                                    $scope.sportsChecked.women[divisions.name].forEach(function(customSports) {
                                        if ($scope.sportsChecked.womenChecked[divisions.name].indexOf(customSports.syssportsId) > -1) {
                                            customSports.is_checked = true;
                                        }
                                    })
                                })
                            })

                            // console.log('root sportsDivisions----->>', $rootScope.sportsDivisions);
                            // console.log('root sysSports----->>', $rootScope.sysSports);


                            // console.log('----->>', $scope.sportsChecked);


                        } catch (e) {
                            console.log('exception ', e);
                        }

                    }
                    usSpinnerService.stop('spinner-1');
                });
    }

    $scope.$watch('similarCollegeData', function(newValue) {
        if (newValue && k == 0) {
            k = 1;
            $scope.similarCollegeData = _.filter($scope.similarCollegeData, function(i) {
                return $scope.similarArray.indexOf(i.schoolID) == -1;
            });
        }
    }, true);
    /* Toggle Button for Sports and Intended Study*/
    $scope.toggalBtn = function() {
        
        var objIntendedStudyOption = $scope.intendedStudyOption;
        for (var i = 0; i < objIntendedStudyOption.length; i++) {
            var obj = objIntendedStudyOption[i],
                ele = obj.sysIntendedStudyOptionName.slice(0, -1).split(' ').join(''),
                value = obj.optionValue;
            if (value === 'YES') {
                $('#' + ele).bootstrapToggle('on');
            } else {
                $('#' + ele).bootstrapToggle('off');
            }
            (function(i) {
                $('#' + ele).change(function() {
                    $scope.intendedStudyOption[i].optionValue = $(this).prop('checked') ? 'YES' : 'NO';
                    // console.log('Value Changed ', $scope.intendedStudyOption[i].optionValue);
                    if ($scope.intendedStudyOption[i].optionValue == 'YES') {
                        $scope.intendedStudyOption[i].optionValueID = 1;
                    } else {
                        $scope.intendedStudyOption[i].optionValueID = 2;
                    }
                    // console.log('which one?? ',$scope.intendedStudyOption[i]);

                })
            })(i);
        }

        var intramuralsFlag = $scope.sports.intramurals,
            intramurals = $('#intramurals');
        if (intramuralsFlag) {
            intramurals.bootstrapToggle('on');
        } else {
            intramurals.bootstrapToggle('off');
        }

        intramurals.change(function() {
            $scope.sports.intramurals = $(this).prop('checked') ? true : false;
            // console.log('Value Changed ', $scope.sports.Intramurals);
        })

    }

    // $scope.$watch('college',function (newValue) {
    //     console.log('newValue',newValue);
    // },true);
    $scope.saveCollege = function() {
        //debugger
        //$('body').addClass('page-loader');
        // console.log('save detail====>', $scope.saveCollegeForm.$valid);
        usSpinnerService.spin('spinner-1');
        if (!$scope.saveCollegeForm.$valid) {
            return false;
        }

        var data = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeName': $scope.college.colgName ? $scope.college.colgName : null,
            'collegeTypeId': $scope.college.colgType ? $scope.college.colgType : null,

            // 'collegeTypeId': $rootScope.colgData['collegeTypeId'] ? $rootScope.colgData['collegeTypeId'] : null,
            'city': $scope.college.colgCity ? $scope.college.colgCity : null,
            'collegeLatitude': $scope.college.colgLatitude ? $scope.college.colgLatitude : null,
            'collegeLongitude': $scope.college.colgLongitude ? $scope.college.colgLongitude : null,
            'accessTypeID': $scope.college.accessType ? $scope.college.accessType : null,
            'collegeAreaID': $scope.college.colgArea ? $scope.college.colgArea : null
        };

        // console.log('data finally data', data);
        editCollegeAPI.saveCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                    usSpinnerService.stop('spinner-1');
                });
        //$('body').removeClass('page-loader');

    }

    $scope.addCollege = function(addNew) {
        //debugger
        //$('body').addClass('page-loader');
        usSpinnerService.spin('spinner-1');
        // console.log('save detail====>', $rootScope.colgData);
        var data;

        if (addNew == 'new') {
            data = {
                'collegeId': null,
                'collegeName': $scope.addCollegeName ? $scope.addCollegeName : null,
                'collegeTypeId': $scope.addCollegeTypeId ? $scope.addCollegeTypeId : null,
                'city': $scope.addCollegeCity ? $scope.addCollegeCity : null,
                'collegeLatitude': $scope.addCollegeLatitude ? $scope.addCollegeLatitude : null,
                'collegeLongitude': $scope.addCollegeLongitude ? $scope.addCollegeLongitude : null,
                'accessTypeID': $scope.addCollegeAccessTypeID ? $scope.addCollegeAccessTypeID : null,
                'collegeAreaID': $scope.addCollegeAreaID ? $scope.addCollegeAreaID : null
            }
        } else {
            data = {
                'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
                'collegeName': $scope.college.colgName ? $scope.college.colgName : null,
                'collegeTypeId': $rootScope.colgData['collegeTypeId'] ? $rootScope.colgData['collegeTypeId'] : null,
                'city': $scope.college.colgCity ? $scope.college.colgCity : null,
                'collegeLatitude': $scope.college.colgLatitude ? $scope.college.colgLatitude : null,
                'collegeLongitude': $scope.college.colgLongitude ? $scope.college.colgLongitude : null,
                'accessTypeID': $scope.college.colgAccessTypeID ? $scope.college.colgAccessTypeID : null,
                'collegeAreaID': $scope.college.colgAreaID ? $scope.college.colgAreaID : null
            };
        }


        // console.log('data finally data', data);
        editCollegeAPI.addCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });
        //$('body').removeClass('page-loader');
        usSpinnerService.sptop('spinner-1');

    }

    $scope.searchCollege = function(data) {
        $scope.colgList = true;
        $scope.editList = true;
        $scope.searchList = false;
       
        var data = {
            collegeName: data
        };
        editCollegeAPI.searchCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                    $scope.fetchedCollegedata = data;
                });
        
    }

$scope.searchUser = function(data) {
        $scope.userList = true;
        $scope.userSearch = false;
       
        var data = {
            "string": data
        };
        editCollegeAPI.searchUserDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                    $scope.userdata = data;
                });
        
    }
    
    $scope.saveQuickFact = function() {
        //debugger
        usSpinnerService.spin('spinner-1');
        // console.log('save saveQuickFact====>', $rootScope.colgData);
        var qukFact = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'quickFactsValue': $scope.quickfact.quickFactsValue ? $scope.quickfact.quickFactsValue : null,
            'quickFactsID': $scope.quickfact.quickFactsID ? $scope.quickfact.quickFactsID : null

        };

        // console.log('data saveQuickFact', qukFact);
        editCollegeAPI.saveQuickFactsDetail(qukFact)
            .then(
                function(data) {
                    console.log('save saveQuickFact====>', data);
                    usSpinnerService.stop('spinner-1');
                });
    }



    $scope.saveFreshman = function() {
        usSpinnerService.spin('spinner-1');
        // $scope.enrollmentID = $scope.enrollmentStatusId
        // console.log('testData', $scope.geoData);
        // console.log('testData for ethecity', $scope.clgEthenicity);
        var finalGeoData = [];

        for (var count = 0; count < $scope.geoData.length; count++) {
            var finalGeoObject = {};

            finalGeoObject['collegeGeographicsId'] = $scope.geoData[count].collegeGeographicsId;
            // finalGeoObject['sysgeographicsId'] = $scope.geoData[count].sysgeographicsId;
            finalGeoObject['geographicsPercentage'] = $scope.geoData[count].geographicsPercentage;
            finalGeoData.push(finalGeoObject);
        }
        // console.log('final geographical array', finalGeoData);

        // console.log('data finally geographical data', finalGeoData);
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

        // console.log('data finally Ethenicity data', finalethEncityData);
        editCollegeAPI.saveEthenicityDetail(finalethEncityData)
            .then(
                function(data) {
                    console.log('save Ethenicity detail====>', data);
                });
        // console.log('data finally Ethenicity data', finalethEncityData);

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
            'religiousAffiliation': $scope.freshman.religiousAffiliation ? $scope.freshman.religiousAffiliation : null,
            'percentageReceivingFinancialAid': $scope.freshman.rcvFinanceAid ? $scope.freshman.rcvFinanceAid : null,
            'malePercentage': $scope.freshman.malePer ? $scope.freshman.malePer : null,
            'femalePercentage': $scope.freshman.femalePer ? $scope.freshman.femalePer : null
        };
        // console.log('data finally Freshman Common data', freshmanData);
        editCollegeAPI.saveFreshmanDetail(freshmanData)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                });

        var mostRepresentedStt = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'mostRepresentedStateID': $scope.mostRepresentedState.mostRepresentedStateID ? $scope.mostRepresentedState.mostRepresentedStateID : null,
            'stateId1': $scope.mostRepresentedState.stateId1 ? $scope.mostRepresentedState.stateId1 : null,
            'stateId2': $scope.mostRepresentedState.stateId2 ? $scope.mostRepresentedState.stateId2 : null,
            'stateId3': $scope.mostRepresentedState.stateId3 ? $scope.mostRepresentedState.stateId3 : null,
            'stateId4': $scope.mostRepresentedState.stateId4 ? $scope.mostRepresentedState.stateId4 : null,
            'stateId5': $scope.mostRepresentedState.stateId5 ? $scope.mostRepresentedState.stateId5 : null,

        }

        // console.log('data finally mostRepresentedStt Common data', mostRepresentedStt);
        editCollegeAPI.saveMostRepStateDetail(mostRepresentedStt)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                    usSpinnerService.stop('spinner-1');
                });



    };

    $scope.saveCollegeRanking = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData College ranking data', $scope.collegeRanking);
        var finalColegeRankingData = [],
            collegeId = $scope.collegeRanking[0].collegeId;
        /* Scope Data */
        for (var count = 0; count < $scope.collegeRanking.length; count++) {
            var finalColegeRankingObject = {};
            // finalColegeRankingObject['collegeId'] = collegeId;
            finalColegeRankingObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalColegeRankingObject['collegeRankingId'] = $scope.collegeRanking[count].collegeRankingId;
            finalColegeRankingObject['rankingUrl'] = $scope.collegeRanking[count].rankingUrl;
            finalColegeRankingObject['rankingPoints'] = $scope.collegeRanking[count].rankingPoints;
            finalColegeRankingData.push(finalColegeRankingObject);
        }
        /* Custom Array from Directive */
        // var clgRankingArray = $scope.clgRankingArray;
        // var clgRankingPointsArray = $scope.clgRankingPointsArray;

        // for (var i = 1; i < clgRankingArray.length; i++) {
        //     if (clgRankingArray[i] != undefined) {
        //         var finalColegeRankingObject = {};
        //         finalColegeRankingObject['collegeId'] = $rootScope.colgData['collegeId'];
        //         finalColegeRankingObject['ranking'] = clgRankingArray[i];
        //         finalColegeRankingObject['rankingPoints'] = clgRankingPointsArray[i];
        //         finalColegeRankingData.push(finalColegeRankingObject);
        //     }
        // }

        // console.log('final saveColegeRanking array', finalColegeRankingData);

        editCollegeAPI.saveCollegeRankingDetail(finalColegeRankingData)
            .then(
                function(data) {
                    console.log('save detail saveCollegeRankingDetail====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveProminentAlumni = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData Prominent Alumni data', $scope.prominentAlumni);
        var finalProminentAlumniData = [],
            collegeId = $scope.prominentAlumni[0].collegeId;
        /* Scope Data */
        for (var count = 0; count < $scope.prominentAlumni.length; count++) {
            var finalProminentAlumniObject = {};
            finalProminentAlumniObject['collegeId'] = $rootScope.colgData['collegeId']
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
                finalProminentAlumniObject['collegeId'] = $rootScope.colgData['collegeId'];
                finalProminentAlumniObject['alumniName'] = prominentArray[i];

                finalProminentAlumniData.push(finalProminentAlumniObject);
            }
        }

        // console.log('final array', finalProminentAlumniData);

        editCollegeAPI.saveProminentAlumniDetail(finalProminentAlumniData)
            .then(
                function(data) {
                    console.log('save detail Prominent Alumni====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveAddress = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('Save Address data', $scope.linkAndAddress);
        var finalLinkAndAddressData = [],
            collegeId = $scope.linkAndAddress[0].collegeId;

        /* Scope Data */
        for (var count = 0; count < $scope.linkAndAddress.length; count++) {
            var finalLinkAndAddressObject = {};
            finalLinkAndAddressObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalLinkAndAddressObject['websiteName'] = $scope.linkAndAddress[count].websiteName;
            finalLinkAndAddressObject['websiteUrl'] = $scope.linkAndAddress[count].websiteUrl;
            finalLinkAndAddressObject['websiteDetailsId'] = $scope.linkAndAddress[count].websiteDetailsId;

            finalLinkAndAddressData.push(finalLinkAndAddressObject);
        }


        /* Custom Array from Directive */
        // var websiteNameArray = $scope.websiteNameArray;
        // for (var i = 1; i < websiteNameArray.length; i++) {
        //     if (websiteNameArray[i] != undefined) {
        //         var finalLinkAndAddressObject = {};
        //         finalLinkAndAddressObject['collegeId'] = $rootScope.colgData['collegeId']
        //         finalLinkAndAddressObject['websiteName'] = $scope.websiteNameArray[i];
        //         finalLinkAndAddressObject['websiteUrl'] = $scope.websiteURLArray[i];

        //         finalLinkAndAddressData.push(finalLinkAndAddressObject);
        //     }
        // }

        // console.log('final array', finalLinkAndAddressData);

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

        // console.log('data finally data', data);
        editCollegeAPI.saveCollegeDetail(data)
            .then(
                function(data) {
                    console.log('save detail====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveIntendedStudy = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData saveIntendedStudy data', $scope.intendedStudy);
        var finalIntendedStudyData = [];

        for (var count = 0; count < $scope.intendedStudy.length; count++) {
            var finalIntendedStudyObject = {};
            finalIntendedStudyObject['collegeID'] = $rootScope.colgData['collegeId'];
            finalIntendedStudyObject['collegeIntendedStudyID'] = $scope.intendedStudy[count].collegeIntendedStudyID;
            finalIntendedStudyObject['intendedStudyName'] = $scope.intendedStudy[count].intendedStudyName;
            finalIntendedStudyObject['intendedStudyType'] = $scope.intendedStudy[count].intendedStudyType;
            finalIntendedStudyObject['intendedStudyPercentage'] = $scope.intendedStudy[count].intendedStudyPercentage;

            finalIntendedStudyData.push(finalIntendedStudyObject);
        }

        var finalIntendedStudyoptionData = [];

        // for (var count = 0; count < $scope.intendedStudyOption.length; count++) {
        //     var finalIntendedStudyOptionObject = {};
        //     finalIntendedStudyOptionObject['collegeID'] = $rootScope.colgData['collegeId'];
        //     finalIntendedStudyOptionObject['intendedStudyOptionID'] = $scope.intendedStudyOption[count].intendedStudyOptionID;
        //     finalIntendedStudyOptionObject['optionValueID'] = $scope.intendedStudyOption[count].optionValueID;
        //     finalIntendedStudyOptionObject['optionBadgeID'] = $scope.intendedStudyOption[count].optionBadgeID;

        //     finalIntendedStudyoptionData.push(finalIntendedStudyOptionObject);
        // }
        var intendedOptions = angular.copy($scope.intendedStudyOption);
        intendedOptions = _.forEach(intendedOptions, function(item) {
            delete item.badgeValue;
            delete item.optionValue;
            delete item.sysIntendedStudyOptionID;
            delete item.sysIntendedStudyOptionName;
        });

        // console.log('intendedOptions', intendedOptions);

        editCollegeAPI.saveIntendedStudyOptionDetail(intendedOptions)
            .then(
                function(data) {
                    console.log('save geographic detail====>', data);
                });



        var stuFacRatio = {
            'collegeID': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeIntendedStudyID': $scope.intendedStudy[0].collegeIntendedStudyID,
            // 'collegeIntendedStudyID': $scope.intendedStudy.collegeIntendedStudyID ? $scope.intendedStudy.collegeIntendedStudyID : null,
            'studentFacultyRatio': parseInt($scope.studentFacultyRatio.studentFacultyRatio, 10) ? parseInt($scope.studentFacultyRatio.studentFacultyRatio, 10) : 0



        }
        finalIntendedStudyData.push(stuFacRatio);

        // console.log('final array IntendedStudy', finalIntendedStudyData);

        editCollegeAPI.saveIntendedStudyDetail(finalIntendedStudyData)
            .then(
                function(data) {
                    console.log('save detail IntendedStudy====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.uploadSportsfileupload = function(event) {
        var file = $scope.myFile;
        $scope.selectedUploadFile = 'sportsfileupload';
        // console.log('file is ' + $scope.selectedUploadFile);
        editCollegeAPI.uploadFileToUrl(file, $scope.selectedUploadFile);
    };

    $scope.uploadFile = function(event) {
        var file = $scope.myFile;
        $scope.selectedUploadFile = 'uploadFile';
        // console.log('file is ' + $scope.selectedUploadFile);
        editCollegeAPI.uploadFileUrl(file, $scope.selectedUploadFile);
    };
    // $scope.$watch('sports',function (newValue,oldValue){
    //     console.log('newValue',newValue);
    // },true);

    $scope.saveSports = function() {
        usSpinnerService.spin('spinner-1');

        var finalSportsCheckedDataMen = angular.copy($scope.sportsChecked.men);
        var finalSportsCheckedDataWomen = angular.copy($scope.sportsChecked.women);
        var sportsUpdateArray = [];
        // MEN
        for (var key in finalSportsCheckedDataMen) {
            finalSportsCheckedDataMen[key] = _.filter(finalSportsCheckedDataMen[key], function(item) {
                return item.is_checked;
            })
        }
        finalSportsCheckedDataMen = _.filter(finalSportsCheckedDataMen, function(item) {
            if (item.length) {
                item.forEach(function(i) {
                    sportsUpdateArray.push(i);
                    return item;
                })
            }
        });

        // WOMEN
        for (var key in finalSportsCheckedDataWomen) {
            finalSportsCheckedDataWomen[key] = _.filter(finalSportsCheckedDataWomen[key], function(item) {
                return item.is_checked;
            })
        }
        finalSportsCheckedDataWomen = _.filter(finalSportsCheckedDataWomen, function(item) {
            if (item.length) {
                item.forEach(function(i) {
                    sportsUpdateArray.push(i);
                    return item;
                })
            }
        });


        sportsUpdateArray.forEach(function(arr) {
                delete arr.is_checked;
                delete arr.syssportsName;
            })
             console.log('sportsUpdateArray',sportsUpdateArray);
             console.log('------>>>',$scope.sports);

             var teamName = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'teamName': $scope.sports['teamName'] ? $scope.sports['teamName'] : null,
            'intramurals': $scope.sports['Intramurals'] ? $scope.sports['Intramurals'] : null
            // 'syssportsId': $scope.sports['syssportsId'] ? $scope.sports['syssportsId'] : null,
            
            
        }

         console.log('teamName',teamName);

        sportsUpdateArray.push(teamName);
        
        editCollegeAPI.saveSportsDetail(sportsUpdateArray)
            .then(
                function(data) {
                    //console.log('save detail IntendedStudy====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    // $scope.$watch('SatData', function (newValue,oldValue){
    //     console.log('newValue',newValue);
    // },true);


    $scope.saveTestScore = function() {
        usSpinnerService.spin('spinner-1');
        var testScoreSatCriticalReading = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.SatData.CriticalReading.collegeScoreId ? $scope.SatData.CriticalReading.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.CriticalReading.scoreLowerLimit, 10) ? parseInt($scope.SatData.CriticalReading.scoreLowerLimit, 10) : 0,
            'scoreHigherLimit': parseInt($scope.SatData.CriticalReading.scoreHigherLimit, 10) ? parseInt($scope.SatData.CriticalReading.scoreHigherLimit, 10) : 0
        }
        var testScoreSatMath = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.SatData.math.collegeScoreId ? $scope.SatData.math.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.math.scoreLowerLimit, 10) ? parseInt($scope.SatData.math.scoreLowerLimit, 10) : 0,
            'scoreHigherLimit': parseInt($scope.SatData.math.scoreHigherLimit, 10) ? parseInt($scope.SatData.math.scoreHigherLimit, 10) : 0
        }
        var testScoreSatWriting = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.SatData.Writing.collegeScoreId ? $scope.SatData.Writing.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.SatData.Writing.scoreLowerLimit, 10) ? parseInt($scope.SatData.Writing.scoreLowerLimit, 10) : 0,
            'satHighWriting': parseInt($scope.SatData.Writing.scoreHigherLimit, 10) ? parseInt($scope.SatData.Writing.scoreHigherLimit, 10) : 0
        }
        var testScoreSatAvg = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.SatData.Writing.collegeScoreId ? $scope.SatData.Writing.collegeScoreId : null,
            'TotalLow': parseInt($scope.SatData.TotalLow, 10) ? parseInt($scope.SatData.TotalLow, 10) : 0,
            'TotalHigh': parseInt($scope.SatData.TotalHigh, 10) ? parseInt($scope.SatData.TotalHigh, 10) : 0

        }
        var testScoreActAvg = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.SatData.Writing.collegeScoreId ? $scope.SatData.Writing.collegeScoreId : null,
            'CompositeLow': parseInt($scope.ActData.CompositeLow, 10) ? parseInt($scope.ActData.CompositeLow, 10) : 0,
            'CompositeHigh': parseInt($scope.ActData.CompositeHigh, 10) ? parseInt($scope.ActData.CompositeHigh, 10) : 0

        }
        var testScoreActEnglish = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.ActData.English.collegeScoreId ? $scope.ActData.English.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.ActData.English.scoreLowerLimit, 10) ? parseInt($scope.ActData.English.scoreLowerLimit, 10) : 0,
            'scoreHigherLimit': parseInt($scope.ActData.English.scoreHigherLimit, 10) ? parseInt($scope.ActData.English.scoreHigherLimit, 10) : 0
        }
        var testScoreActMath = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeScoreId': $scope.ActData.math.collegeScoreId ? $scope.ActData.math.collegeScoreId : null,
            'scoreLowerLimit': parseInt($scope.ActData.math.scoreLowerLimit, 10) ? parseInt($scope.ActData.math.scoreLowerLimit, 10) : 0,
            'scoreHigherLimit': parseInt($scope.ActData.math.scoreHigherLimit, 10) ? parseInt($scope.ActData.math.scoreHigherLimit, 10) : 0
        }
        var testScoreAverage = {
                'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
                'collegeScoreId': $scope.ActData.math.collegeScoreId ? $scope.ActData.math.collegeScoreId : null,
                'averageGPA': $scope.testScoreAvg.averageGPA ? $scope.testScoreAvg.averageGPA : null,
                'averageSAT': parseInt($scope.testScoreAvg.averageSAT, 10) ? parseInt($scope.testScoreAvg.averageSAT, 10) : 0,
                'averageACT': parseInt($scope.testScoreAvg.averageACT, 10) ? parseInt($scope.testScoreAvg.averageACT, 10) : 0
            }
            // console.log("testScoreAverage====>", testScoreAverage);
        var finalTestScoreData = [];
        finalTestScoreData.push(testScoreSatAvg);
        finalTestScoreData.push(testScoreActAvg);
        finalTestScoreData.push(testScoreAverage);
        finalTestScoreData.push(testScoreSatCriticalReading);
        finalTestScoreData.push(testScoreSatMath);
        finalTestScoreData.push(testScoreSatWriting);
        finalTestScoreData.push(testScoreActEnglish);
        finalTestScoreData.push(testScoreActMath);

        $scope.criticalReading.forEach(function(item) {
            console.log('item', item);
            item.percentage = parseInt(item.percentage, 10);
            finalTestScoreData.push(item);
        });
        $scope.sATMathPercentage.forEach(function(item) {
            console.log('item', item);
            item.percentage = parseInt(item.percentage, 10);
            finalTestScoreData.push(item);
        });
        $scope.sATWritingPercentage.forEach(function(item) {
            console.log('item', item);
            item.percentage = parseInt(item.percentage, 10);
            finalTestScoreData.push(item);
        });
        $scope.actScore.forEach(function(item) {
            console.log('item', item);
            item.percentage = parseInt(item.percentage, 10);
            finalTestScoreData.push(item);
        });
        $scope.gpaScore.forEach(function(item) {
            console.log('item', item);
            item.percentage = parseInt(item.percentage, 10);
            finalTestScoreData.push(item);
        });

        // console.log('testData $scope.satScore data', $scope.satScore);
        // console.log("finalTestScoreData===========>", finalTestScoreData);

        editCollegeAPI.saveTestScoreDetail(finalTestScoreData)
            .then(
                function(data) {
                    console.log('save detail Test And Score====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveAdmission = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData Admission data', $scope.admission);
        var finalAdmissionData = [];

        for (var count = 0; count < $scope.admission.length; count++) {
            var finalAdmissionObject = {};
            finalAdmissionObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalAdmissionObject['admissionsOptionID'] = $scope.admission[count].admissionsOptionID;
            finalAdmissionObject['optionNameID'] = $scope.admission[count].optionNameID;
            finalAdmissionObject['optionValueID'] = $scope.admission[count].optionValueID;
            finalAdmissionObject['badgeID'] = $scope.admission[count].badgeID;

            // console.log(finalAdmissionObject);
            finalAdmissionData.push(finalAdmissionObject);
        }

        // console.log('final array admission', finalAdmissionData);

        for (var count = 0; count < $scope.interview.length; count++) {
            var finalInterviewObject = {};
            finalInterviewObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalInterviewObject['admissionsOptionID'] = $scope.interview[count].admissionsOptionID;
            finalInterviewObject['optionNameID'] = $scope.interview[count].optionNameID;
            finalInterviewObject['optionValueID'] = $scope.interview[count].optionValueID;
            finalInterviewObject['badgeID'] = $scope.interview[count].badgeID;


            finalAdmissionData.push(finalInterviewObject);
        }

        // console.log('final array interview', finalAdmissionData);



        for (var count = 0; count < $scope.recommendation.length; count++) {
            var finalRecommendationObject = {};
            finalRecommendationObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalRecommendationObject['admissionsOptionID'] = $scope.recommendation[count].admissionsOptionID;
            finalRecommendationObject['optionNameID'] = $scope.recommendation[count].optionNameID;
            finalRecommendationObject['optionValueID'] = $scope.recommendation[count].optionValueID;
            finalRecommendationObject['badgeID'] = $scope.recommendation[count].badgeID;


            finalAdmissionData.push(finalRecommendationObject);
        }

        var admCode = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'admissionsOptionID': $scope.admission[0].admissionsOptionID,
            'satCode': parseInt($scope.admissionCode.satCode, 10) ? parseInt($scope.admissionCode.satCode, 10) : 0,
            'actCode': parseInt($scope.admissionCode.actCode, 10) ? parseInt($scope.admissionCode.actCode, 10) : 0
        }
        finalAdmissionData.push(admCode);
        // console.log('final array recommendation', finalAdmissionData);
        editCollegeAPI.saveAdmissionDetail(finalAdmissionData)
            .then(
                function(data) {
                    console.log('save detail finalAdmissionData====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveFeesAndFinancial = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData saveFeesAndFinancial data', $scope.feesAndFinancial);
        var finalFeesAndFinancialData = [];

        for (var count = 0; count < $scope.feesAndFinancial.length; count++) {
            var finalFeesAndFinancialObject = {};
            finalFeesAndFinancialObject['collegeID'] = $rootScope.colgData['collegeId'];
            finalFeesAndFinancialObject['collegeFeesID'] = $scope.feesAndFinancial[count].collegeFeesID;
            finalFeesAndFinancialObject['fees'] = parseInt($scope.feesAndFinancial[count].fees);


            finalFeesAndFinancialData.push(finalFeesAndFinancialObject);
        }
        // console.log('final array FeesAndFinancial', finalFeesAndFinancialData);

        var averageFees = {
            'collegeID': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
            'collegeFeesID': $scope.feesAndFinancial[0].collegeFeesID,
            'averageFinancialAid': parseInt($scope.AvgFees.averageFinancialAid, 10) ? parseInt($scope.AvgFees.averageFinancialAid, 10) : 0,
            'receivingFinancialAid': parseInt($scope.AvgFees.receivingFinancialAid, 10) ? parseInt($scope.AvgFees.receivingFinancialAid, 10) : 0
        }
        finalFeesAndFinancialData.push(averageFees);
        editCollegeAPI.saveFeesAndFinancialDetail(finalFeesAndFinancialData)
            .then(
                function(data) {
                    // console.log('save detail FeesAndFinancial====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };

    $scope.saveCalendar = function() {
        usSpinnerService.spin('spinner-1');
        // console.log('testData Calendar data', $scope.test);
        var finalCalendarData = [];

        for (var count = 0; count < $scope.test.length; count++) {
            var finalCalendarObject = {};
            finalCalendarObject['collegeId'] = $rootScope.colgData['collegeId'];
            finalCalendarObject['collegeCalendarId'] = $scope.test[count].collegeCalendarId;
            finalCalendarObject['eventName'] = $scope.test[count].eventName;
            finalCalendarObject['eventDate'] = $scope.test[count].eventDate;
            finalCalendarData.push(finalCalendarObject);
        }

        /* Custom Array from Directive */
        // var calendarEventNameArray = $scope.calendarEventNameArray;
        // var calendarEventDateArray = $scope.calendarEventDateArray;
        // for (var i = 1; i < calendarEventNameArray.length; i++) {
        //     if (calendarEventNameArray[i] != undefined) {
        //         var finalCalendarObject = {};
        //         finalCalendarObject['collegeId'] = $rootScope.colgData['collegeId'];
        //         finalCalendarObject['eventName'] = calendarEventNameArray[i];
        //         finalCalendarObject['eventDate'] = calendarEventDateArray[i];

        //         finalCalendarData.push(finalCalendarObject);
        //     }
        // }

        // console.log('final array for calendar', finalCalendarData);

        editCollegeAPI.saveCalendarDetail(finalCalendarData)
            .then(
                function(data) {
                    // console.log('save detail====>', data);
                    usSpinnerService.stop('spinner-1');
                });

    };


    $scope.saveWeather = function() {
        usSpinnerService.spin('spinner-1');
        var finalWeatherData = {
            'collegeId': $rootScope.colgData['collegeId'] ? $rootScope.colgData['collegeId'] : null,
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
                    usSpinnerService.stop('spinner-1');
                });
    }



    $scope.backCollegeList = function() {
        usSpinnerService.spin('spinner-1');
        $scope.colgList = false;
        $scope.editList = true;
        usSpinnerService.stop('spinner-1');

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
        event.target.style.backgroundColor = "#ccc";

    }

    $scope.womenSport = function() {

        $scope.menSports = true;
        $scope.womenSports = false;
        event.target.style.backgroundColor = "#ccc";
    }

    $scope.outStates = function() {

        $scope.outState = false;
        $scope.inState = true;
    }

    $scope.inStates = function() {

        $scope.outState = true;
        $scope.inState = false;
    }
    $scope.deleteAns = function(count) {
        // console.log('count is', count);
        $scope.address.splice(count, 1);
        // console.log('$scope.address ---->', $scope.address);
    }
    $scope.deleteProminent = function(count) {
        // console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.prominentAlumni.splice(count, 1);
        // console.log('$scope.prominentAlumni ---->', $scope.prominentAlumni);
        //}
        //}
    }

    $scope.deleteCollegeRanking = function(count) {
        // console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.collegeRanking.splice(count, 1);
        // console.log('$scope.collegeRanking ---->', $scope.collegeRanking);
        //}
        //}
    };

    $scope.deleteAddress = function(count) {
        // console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.linkAndAddress.splice(count, 1);
        // console.log('$scope.linkAndAddress ---->', $scope.linkAndAddress);
        //}
        //}
    }

    $scope.deleteCalendar = function(count) {
        // console.log('coutn is', count);
        //for(counter = 0; counter < $scope.address.length; counter++) {
        //if(values.surveyAnswersID == $scope.address[counter].surveyAnswersID) {
        //  console.log('counter is',counter,$scope.address[counter].surveyAnswersID);
        $scope.test.splice(count, 1);
        // console.log('$scope.test ---->', $scope.test);
        //}
        //}
    }

    $scope.changeAmount = function(ele) {
        // console.log(tempFees + '' + $scope.feesAndFinancial);
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
    $scope.schoolArrayId = [];
    $scope.addSimilarSchools = function(data, event) {
        // console.log('addSimilarSchools======>', data);
        // debugger;

        if ($scope.similarSchoolsArray) {
            $scope.similarSchoolsArray.forEach(function(item) {
                // console.log('item',item);
                if (item.schoolID == data.schoolID) {
                    var nIndex = $scope.similarSchoolsArray.indexOf(item);
                    // console.log('------true---->', nIndex);
                    $scope.similarSchoolsArray.splice(nIndex, 1);
                }
            });
        }

        var index = $scope.schoolArrayId.indexOf(data.schoolID);

        if (index == -1) {
            $scope.schoolArrayId.push(data.schoolID);
            $scope.similarSchoolsArray.push({
                'collegeName': data.collegeName,
                'college': $rootScope.colgData.collegeId,
                'schoolID': data.schoolID
            });
            event.target.style.backgroundColor = "#ccc";
        } else {
            $scope.schoolArrayId.splice(index, 1);
            $scope.similarSchoolsArray.splice(index, 1);
            event.target.style.backgroundColor = "transparent";
        }

    }

    $scope.similarSchoolsSelectedArray = [];
    //Right Button Clicked

    $scope.selectedSimilarSchools = function() {
        // console.log('$scope.schoolArrayId = [];', $scope.schoolArrayId);

        var ind;
        // console.log('similarSchoolsArray',$scope.similarSchoolsArray);

        if ($scope.similarSchoolsArray) {
            $scope.similarSchoolsArray.forEach(function(item1) {
                $scope.similerSchool.push(item1);
                $scope.similarCollegeData = _.filter($scope.similarCollegeData, function(i) {
                    return i.schoolID != item1.schoolID;
                })
            })
            $scope.similarSchoolsArray = [];
            $scope.schoolArrayId = [];
            // console.log('similarSchoolsArray', $scope.similarSchoolsArray);
        }
        console.log('origninal', $scope.similarCollegeData);

    };

    $scope.saveSimilarSchool = function() {
            // console.log('1', $scope.similerSchool);

            $scope.similerSchool = _.each($scope.similerSchool, function(item, key) {

                if (item.schoolID) {
                    item['similarSchoolsID'] = item.schoolID;
                    delete item.schoolID;
                }

            });
            // $scope.similerSchool = _.each($scope.similerSchool,function (item){
            //     console.log('--',item);
            // });

            // console.log('new 1', $scope.similerSchool);

            editCollegeAPI.saveSimilarSchoolDetail($scope.similerSchool)
                .then(
                    function(data) {
                        // console.log('save detail similarschool====>', data);
                    });

        }
        // Sed=nd this in APi call -similarSchoolsSelectedArray
    $scope.deleteSelectedSchool = function(item) {
        //alert('delete selected school==>'+ item.collegeId);
        // console.log('collegeid', item);

        $scope.similarCollegeData.push(item);
        $scope.similarCollegeData = _.sortByOrder($scope.similarCollegeData, ['collegeName'], ['asc']);
        var index = $scope.similerSchool.indexOf(item);
        $scope.similerSchool.splice(index, 1);

    };
    $scope.selectedFilter = 'all';
    $scope.$watch('selectedFilter', function(newValue) {
        // console.log('new',newValue);
        selectFilter(newValue);
    });
    $scope.$watch('query', function(newValue) {
        // console.log('new',newValue);
        // $scope.query = newValue[$scope.queryBy]
    });

    var selectFilter = function(field) {
        // console.log('field',field);
        if (field == 'collegeName') {
            $scope.queryBy = 'collegeName'
        } else if (field == 'city') {
            $scope.queryBy = 'city';
        } else {
            $scope.queryBy = '$';
        }
    }


    $scope.getNCAA1SportsData = function(data) {
        // console.log('data', data);
    }



}]);

/*-----  End of Controller = CollegeCtrl  ------*/

/*================================================================
Controller = DashboardCtrl
==================================================================*/


app.controller('DashboardCtrl', ['$scope', '$location', '$rootScope', 'logoutAPI', function ($scope, $location, $rootScope, logoutAPI) {

'use strict';

	// console.log('Controller ===  DashboardCtrl');
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
  		// console.log('$files=====>',$scope.test);
      	var data, xhr;
      	data = new FormData();
		data.append( 'file', $( '#file' )[0].files[0] );
		// console.log('data',data);
		var request = new XMLHttpRequest();
		if(data !== null) {
		    request.open('POST', 'http://httpbin.org/post', /* async = */ false);
		    var formData = data;
		    // console.log('formdata---->',formData);
		    request.send(formData);
		    // console.log('output is---->',request.response);
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
	// console.log('data is====>',data.collegeId);
	

	editCollegeAPI.adminlogin(data.collegeId)
	.then(
    		function (data) {
    			console.log('data====>',data);
              if (data !== null) {
                // console.log('get college details',data);
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

app.controller('ForgotpwdCtrl', ['$rootScope', '$scope', 'loginAPI', 'ngProgress', 'ngDialog', 'usSpinnerService', function($rootScope, $scope, loginAPI, ngProgress, ngDialog, usSpinnerService) {
    'use strict';

    // $scope.resetPassword = {
    //     visible: false
    // };
    $scope.statusMsg = '';

    $scope.email = {
        emailId: ''
    }
    $scope.email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;


    $scope.getPassword = function(isValid) {
        if (!isValid) { //not valid
            //$scope.formValidations1 = true;
            //$scope.statusMsg = '';
            alert('Enter Correct Credentials !!');
        } else {
            // console.log('$scope.email.emailId', $scope.email.emailId);

            ngProgress.start();
            var data = {
                "emailId": $scope.email.emailId
            }

            loginAPI.fgtPwd(data).then(
                function(data) {
                    if (data) {
                        // console.log('success', data);
                        //console.log('success',data.statusMsg); not passing status message only passing string
                        //$location.url('/dashboard/home');
                        if (data == "Email doesn't Exixts") {
                            $scope.statusMsg = 'Email Address That you Entered is invalid';
                        } else {
                            $scope.statusMsg = 'Reset Password Link Sent to your Email Address';
                            //$scope.resetPassword.visible = true;
                        }
                        ngProgress.complete();
                    };
                },
                function(err) {
                    console.log('err', err);
                });
        }
    };
    // console.log('Controller ===  ForgotpwdCtrl');

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
				// console.log(data)
	          if (data !== null) {
	            $scope.dashboarddata = data;
	            $scope.name = $.cookie('name');
	            // console.log('=====>',$.cookie('name'));
	            // console.log('values',$scope.dashboarddata);
	          //  $('#loading').removeClass('page-loader');
	          }
	        }
	    );
    }();



	console.log('Controller ===  HomeCtrl');
}]);

/*-----  End of Controller = HomeCtrl  ------*/



/*================================================================
Controller = LoginCtrl
==================================================================*/

app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'loginAPI', 'MasterAPI', 'ngProgress', 'usSpinnerService', function ($scope, $rootScope, $location, loginAPI, MasterAPI, ngProgress, usSpinnerService) {
    'use strict';
    // console.log('Controller ===  LoginCtrl');
    $scope.class_status = 0;
    $rootScope.isSuperAdmin = false;
    $rootScope.isAdmin = false;
    $scope.submitForm = function() {
        if ($scope.user != null) {
            $rootScope.userName = $scope.user.userName;
            // $.cookie('name', $rootScope.userName);
        }
        // console.log('$scope.user',$rootScope.userName);
        //Login API
        if ($scope.loginForm.$invalid) {
            $scope.formValidations = true;
        }
        else {
            // ngProgress.start();
            //debugger;
            usSpinnerService.spin('spinner-1');
            loginAPI.adminlogin($scope.user)
            .then(function (data) {
               // console.log('stipend login data====>',data);
                //$.cookie('isSuperAdmin', data.superAdmin);
                if (data.loginMessage != "Success") {
                    $scope.loginFailed = 'Please Enter Correct Login and Password';     
                } else {
                   // console.log('data after login',data);
                    // MasterAPI Start
                    // localStorage.setItem('userId',data.adminID);

                    // $rootScope.userEmailId = data.emailID;

                    $.cookie('NAME',data.firstName);
                    $.cookie('EMAIL',data.emailID);
                    $rootScope.userFirstName = $.cookie('NAME');
                    $rootScope.userEmailId = $.cookie('EMAIL');
                    MasterAPI.getdropdowndata()
                    .then(function (data) {
                        // console.log('data master API Success====>',data);
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
        usSpinnerService.stop('spinner-1');
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

app.controller('MainCtrl', ['$scope', '$location', 'MasterAPI', '$rootScope', '$state', function ($scope, $location, MasterAPI, $rootScope, $state) {
'use strict';

	// console.log('Controller ===  MainCtrl');
	$rootScope.dropDownData = '';

    console.log('statee-e----e-e---',$location.url());
    if (!$location.url().match('resetPassword')) {
        // console.log('true');
	 MasterAPI.getdropdowndata()
                    .then(function (data) {
                        console.log('data master API Success====>',data);
                         //var test = JSON.stringify(data);
                        //$.cookie('dropDownData',test);
                    $rootScope.dropDownData = data;
                    $rootScope.colgType = data['SysCollegetype'];
                    // console.log('$rootScope.colgType',$rootScope.colgType);
                    $rootScope.colgArea = data['SysCollegeArea'];
                    // console.log('$rootScope.colgArea',$rootScope.colgArea);
                    $rootScope.accessType = data['SysAccessType'];
                    // console.log('$rootScope.accessType',$rootScope.accessType);
                    $rootScope.admissionVal = data['SysAdmissionOptionValue'];
                    // console.log('$rootScope.admissionVal',$rootScope.admissionVal);
                    $rootScope.admissionBadge = data['SysAdmissionBadge'];
                    // console.log('$rootScope.admissionBadge',$rootScope.admissionBadge);
                    $rootScope.sysSports = data['SysSports'];
                    $rootScope.sysSports2 = angular.copy(data['SysSports']);
                    $rootScope.sysSports3 = angular.copy(data['SysSports']);
                    $rootScope.sysSports4 = angular.copy(data['SysSports']);
                    $rootScope.sysSports5 = angular.copy(data['SysSports']);
                    $rootScope.sysSports6 = angular.copy(data['SysSports']);
                    $rootScope.sportsDivisions = data.SysSportsDivision;
                    $rootScope.sportsDivisions.forEach(function (item) {
                        item['divisionName'] = item.sysSportsDivisionName.split(' ').join('');
                    })
                    // console.log('$rootScope.sysSports ',$rootScope.sysSports) ;
                    $rootScope.userFirstName = $.cookie('NAME');
                    $rootScope.userEmailId = $.cookie('EMAIL');


                    });
    }
    // }
 

  $scope.logout = function() {
    $.removeCookie('NAME');
    location.href = '/';
  }
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
			var popupStatus = 0;


    $(".Login_PopUp_Link").click(function() {

        //Aligning our box in the middle
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $("#popupLogin").height();
        var popupWidth = $("#popupLogin").width();
        //centering
        $("#popupLogin").css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2,
            "left": windowWidth / 2 - popupWidth / 2
        });

        //aligning our full bg 
        $("#LoginBackgroundPopup").css({
            "height": windowHeight
        });


        // Pop up the div and Bg
        if (popupStatus == 0) {
            $("#LoginBackgroundPopup").css({
                "opacity": "0.7"
            });
            $("#LoginBackgroundPopup").fadeIn("slow");
            $("#popupLogin").fadeIn("slow");
            popupStatus = 1;
        }


    });


    //Close Them
    $("#popupLoginClose").click(function() {
        if (popupStatus == 1) {
            $("#LoginBackgroundPopup").fadeOut("slow");
            $("#popupLogin").fadeOut("slow");
            popupStatus = 0;
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
                // console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            // console.log('Directive === addAnswer');
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
                // console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            // console.log('Directive === addCalendar');
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
                // console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            // console.log('Directive === addProminent');
        }
    };

}]);

/*-----  End of Directive = addProminent  ------*/

app.directive('afterRepeatDirective', ['$rootScope', function($rootScope) {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (scope.$last) {
                // iteration is complete, do whatever post-processing is necessary
                //element.parent().css('border', '1px solid black');
                // var objIntendedStudyOption = scope.$parent.intendedStudyOption;
                // for (var i = 0; i < objIntendedStudyOption.length; i++) {
                //     var obj = objIntendedStudyOption[i];
                //     var ele = obj.sysIntendedStudyOptionName.slice(0,-1).split(' ').join('');
                //     debugger;
                //     //console.log(obj.sysIntendedStudyOptionName);
                //     $('#'+ele).bootstrapToggle();
                //     console.log(document.getElementById(ele));//.bootstrapToggle();
                // }
                //element.bootstrapToggle();
                scope.$evalAsync(attrs.afterRepeatDirective);
                //scope.$parent.intendedStudyOption[0].sysIntendedStudyOptionName
            }
        }
    };
}]);

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
			
			// console.log('Directive === edit_college');
			$(function() {
			    $( "#tabs" ).tabs();
			    $( "#tabs_sports" ).tabs();
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
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
/*================================================================
Directive = afterRepeatDirective
==================================================================*/
/*global app,$*/
app.directive('afterRepeatDirective', ['$rootScope', function($rootScope) {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (scope.$last) {
                // iteration is complete, do whatever post-processing is necessary
                //element.parent().css('border', '1px solid black');
                // var objIntendedStudyOption = scope.$parent.intendedStudyOption;
                // for (var i = 0; i < objIntendedStudyOption.length; i++) {
                // var obj = objIntendedStudyOption[i];
                // var ele = obj.sysIntendedStudyOptionName.slice(0,-1).split(' ').join('');
                // debugger;
                // //console.log(obj.sysIntendedStudyOptionName);
                // $('#'+ele).bootstrapToggle();
                // console.log(document.getElementById(ele));//.bootstrapToggle();
                // }
                //element.bootstrapToggle();
                scope.$evalAsync(attrs.afterRepeatDirective);
                //scope.$parent.intendedStudyOption[0].sysIntendedStudyOptionName
            }
        }
    };
}]);
/*-----  End of Directive = afterRepeatDirective  ------*/
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
=>                   Filter = genderFilter
==================================================================*/
/*global app*/

app.filter('genderFilter', function () {
	
	'use strict';

	return function (data) {
		//var dateDiff = 0;
		// console.log('data',data);
		if (data == 1) {
			return 'male';
		}else if (data == 2) {
			return 'female';
		} else {
			return data;
		}
	};
});


/*-----  End of Filter = genderFilter  ------*/
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
/*================================================================
=>                   Filter = userTypeFilter
==================================================================*/
/*global app*/

app.filter('userTypeFilter', function() {

    'use strict';

    return function(data) {
        //var dateDiff = 0;
        // console.log('data', data);
        if (data == 1) {
            return 'Freshman';
        } else if (data == 2) {
            return 'Sophomore';
        } else if (data == 3) {
            return 'Junior';
        } else if (data == 4) {
            return 'Senior';
        } else if (data == 5) {
            return 'Parent';
        } else if (data == 6) {
            return 'Counselor';
        }else {
            return data;
        }
    };
});


/*-----  End of Filter = userTypeFilter  ------*/

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
=>                   Service = FacultylistAPI
==================================================================*/
/*global app, $http*/

app.service('CollegeAPI', ['$rootScope', '$q', 'appConfig', '$http', 'ngDialog','usSpinnerService', function ($rootScope, $q, appConfig, $http, ngDialog, usSpinnerService) {

	'use strict';

	this.getcollegelist = function (page) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/getCollegesInPages/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				// alert('Unable to load list of colleges..');
				ngDialog.open({
                template: '<p>Unable to load list of colleges..</p>',
                plain: true
            });
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getSimilarSchoollist = function (page) {

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/getCollegesInPages/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				// alert('Unable to load list of similar school colleges..');
				ngDialog.open({
                template: '<p>Unable to load list of similar school colleges..</p>',
                plain: true
            });
				deferred.reject(err);
			});

		return deferred.promise;
	};

	this.getUserslist = function (page) {
		console.log('page',page)

		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/usersList/'+page.off+'/'+page.size;
	
		$http.get(serviceUrl)
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (err) {
				// alert('Unable to load list of Users..');
				ngDialog.open({
                template: '<p>Unable to load list of Users..</p>',
                plain: true
            });
				deferred.reject(err);
			});

		return deferred.promise;
	};

	

}]);


/*-----  End of Service = FacultylistAPI  ------*/




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

app.service('editCollegeAPI', ['$rootScope', '$q', 'appConfig', '$http', 'ngDialog', 'usSpinnerService', function($rootScope, $q, appConfig, $http, ngDialog, usSpinnerService) {

    'use strict';

    this.editcollegelist = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/getCollegeDetailsByID/' + data;

        $http.get(serviceUrl)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>Connection Error..</p>',
                    plain: true
                });
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.deleteUserList = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/deleteUser';

        $http.post(serviceUrl, data)
            .success(function(data) {
                ngDialog.open({
                    template: '<p>User deleteted successfully</p>',
                    plain: true
                });
                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>Connection Error..</p>',
                    plain: true
                });
                deferred.reject(err);
            });

        return deferred.promise;
    };


    this.saveCollegeDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/updateCollegeForWeb';

        $http.post(serviceUrl, data)
            .success(function(data) {
                ngDialog.open({
                    template: '<p>College Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>College Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.addCollegeDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/registerCollege';

        $http.post(serviceUrl, data)
            .success(function(data) {
                ngDialog.open({
                    template: '<p>College Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>College Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };


    this.searchCollegeDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/searchCollege';
        console.log('DATA', data);
        $http.post(serviceUrl, data)
            .success(function(data) {

                // alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {

                // alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.searchUserDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/searchUsers';
        console.log('DATA', data);
        $http.post(serviceUrl, data)
            .success(function(data) {

                // alert('College Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {

                // alert('College Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    

    this.saveFreshmanDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/updateFreshMenProfileForWeb';

        $http.post(serviceUrl, data)

        .success(function(data) {
                ngDialog.open({
                    template: '<p>Freshman Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Freshman Details Uploaded Successfully');
                console.log('Freshman save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>Freshman Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Freshman Details Failed to Upload');
                deferred.reject(err);
            });

        return deferred.promise;
    };

    this.saveGeographicDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeGeographicsForWeb';

        $http.post(serviceUrl, data)

        .success(function(data) {
                // ngDialog.open({
                //     template: '<p>Geographic Details Uploaded Successfully.</p>',
                //     plain: true
                //     });
                //alert('Geographic Details Uploaded Successfully');
                console.log('geographics save data=======>', data)
                deferred.resolve(data);
            })
            .error(function(err) {
                //  ngDialog.open({
                // template: '<p>Geographic Details Uploaded Successfully.</p>',
                // plain: true
                // });
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
                ngDialog.open({
                    template: '<p>Calendar Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Calendar Details Uploaded Successfully');
                console.log('Calendar save data=======>', data)

                deferred.resolve(data);
            })
            .error(function(err) {
                ngDialog.open({
                    template: '<p>Calendar Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Calendar Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Weather Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Weather Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Weather Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Weather Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Prominent Alumni Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Prominent Alumni Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Prominent Alumni Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Prominent Alumni Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>College Ranking Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('College Ranking Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>College Ranking Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('College Ranking Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Intended Study Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Intended Study Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Intended Study Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Intended Study Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };

    this.saveIntendedStudyOptionDetail = function(data) {

        var deferred = $q.defer();
        var serviceUrl = appConfig.baseURL + '/addCollegeIntendedStudyOption';

        $http.post(serviceUrl, data)
            .success(function(data) {
                console.log('sucess intended Study', data);
                // ngDialog.open({
                // template: '<p>Intended Study Details Uploaded Successfully.</p>',
                // plain: true
                // });
                // alert('Intended Study Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                // ngDialog.open({
                // template: '<p>Intended Study Details Failed to Upload.</p>',
                // plain: true
                // });
                // alert('Intended Study Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Quick Facts Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Quick Facts Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Quick Facts Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Quick Facts Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Link And Address Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Link And Address Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Link And Address Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Link And Address Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Fees And Financial Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Fees And Financial Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Fees And Financial Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Fees And Financial Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Admissions Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Admissions Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Admissions Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Admissions Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Similar School Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Admissions Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Similar School Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Admissions Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Test Score Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Test Score Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Test Score Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Test Score Details Failed to Upload');
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
                ngDialog.open({
                    template: '<p>Sports Details Uploaded Successfully.</p>',
                    plain: true
                });
                // alert('Sports Details Uploaded Successfully');
                deferred.resolve(data);
            })
            .error(function(err) {
                console.log('error');
                ngDialog.open({
                    template: '<p>Sports Details Failed to Upload.</p>',
                    plain: true
                });
                // alert('Sports Details Failed to Upload');
                deferred.reject(err);
            });
        console.log('promise');
        return deferred.promise;
    };
    this.uploadFileToUrl = function(file, uploadFile) {

        var deferred = $q.defer();
        var fd = new FormData();
        fd.append('file', file);

        var uploadUrl = appConfig.baseURL + '/' + uploadFile;
        console.log('uploadFile', uploadFile);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function(data) {
                console.log('success data', data);

                alert(data.statusMsg);
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
    }

    this.uploadFileUrl = function(file, uploadFile) {

            var deferred = $q.defer();
            var fd = new FormData();
            fd.append('file', file);

            var uploadUrl = appConfig.baseURL + '/' + uploadFile;
            console.log('uploadFile', uploadFile);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(data) {
                    console.log('success data', data);

                    alert(data.statusMsg);
                    deferred.resolve(data);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        }
        // this.editFacultyList = function (contentdata) {
        //  console.log('contentdata======>',contentdata);
        //  var deferred = $q.defer();
        //  var serviceUrl = appConfig.baseURL + '/jsonEditFaculty';
        //  $http.post(serviceUrl,contentdata)
        //      .success(function (data) {
        //          deferred.resolve(data);
        //      })
        //      .error(function (err) {
        //          deferred.reject(err);
        //      });

    //  return deferred.promise;
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
	

	// var data = {
	 //                'emailId': emailId,
	 //                'authCode': authCode,
	 //                'password': userData.newPassword
	 //            }
	this.changePasswordAdmin = function (data) {
		console.log('data',data);
		var deferred = $q.defer();
		var serviceUrl = appConfig.baseURL + '/changePasswordForAdmin/';

		$http.post(serviceUrl, data)//get
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
// this.changePassword = function (data) {
// 		console.log('data',data);
// 		var deferred = $q.defer();
// 		var serviceUrl = appConfig.baseURL + '/changePassword/';

// 		$http.post(serviceUrl, data)//get
// 			.success(function (data) {
// 				console.log('Controller ===  apisuccess');
				
// 				deferred.resolve(data);

// 			})
// 			.error(function (err) {
// 				console.log('Controller =====>apifail');
				
// 				deferred.reject(err);
// 			});

// 		return deferred.promise;
// 	};


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


