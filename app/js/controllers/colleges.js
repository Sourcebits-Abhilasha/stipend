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
