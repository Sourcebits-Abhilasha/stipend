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

                        $scope.freshman.enrollmentID = data['FreshmanProfile']['--'].enrollmentStatusId;
                        $scope.freshman.totApplicants = data['FreshmanProfile']['--'].totalApplicants;
                        $scope.freshman.totAccepted = data['FreshmanProfile']['--'].totalAccepted;
                        $scope.freshman.xptanceRate = data['FreshmanProfile']['--'].acceptanceRate;
                        $scope.freshman.totEnrolled = data['FreshmanProfile']['--'].totalEnrolled;
                        $scope.freshman.earlyDecision = data['FreshmanProfile']['--'].percentageEnrolledEarlyDecision;
                        $scope.freshman.waitingList = data['FreshmanProfile']['--'].percentageEnrolledFromWaitList;
                        $scope.freshman.outFState = data['FreshmanProfile']['--'].percentageEnrolledOutofState;
                        $scope.freshman.ernPiblicHS = data['FreshmanProfile']['--'].percentageEnrolledPublicHs;
                        $scope.freshman.rcvFinanceAid = data['FreshmanProfile']['--'].percentageReceivingFinancialAid;
                        $scope.freshman.avgFinanceAid = data['FreshmanProfile']['--'].averageFinancialAid;
                        $scope.freshman.malePer = data['FreshmanProfile']['--'].malePercentage;
                        $scope.freshman.femalePer = data['FreshmanProfile']['--'].femalePercentage;
                        $scope.freshman.collegeEthnicityID = data['FreshmanProfile']['CollegeEthnicity'].collegeEthnicityID;

                        $scope.weatherObj.avgFallLowTemp = data['IntendedStudy']['--'];
                        // $scope.quickFact.qukFact = data['QuickFacts'].quickFactsValue;

                        $scope.geoData = data['FreshmanProfile']['Geographics'];
                        $scope.clgEthenicity = data['FreshmanProfile']['CollegeEthnicity'];
                        $scope.intendedStudy = data['IntendedStudy']['--'];
                        $scope.admission = data['Admissions']['Admission'];
                        $scope.interview = data['Admissions']['Interviews'];
                        $scope.recommendation = data['Admissions']['Recommendations'];

                        $scope.manSportsDiv1 = data['Sports']['Men']['NCAADIVISION1'];
                        $scope.manSportsDiv2 = data['Sports']['Men']['NCAADIVISION2'];
                        $scope.manSportsDiv3 = data['Sports']['Men']['NCAADIVISION3'];




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
            'femalePercentage': $scope.freshman.femalePer ? $scope.freshman.femalePer : null,
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

    $scope.saveAdmission = function() {
        console.log('testData Admission data', $scope.admission);
        // var finalAdmissionData = [];

        // for (var count = 0; count < $scope.intendedStudy.length; count++) {
        //     var finalAdmissionObject = {};
        //     finalAdmissionObject['collegeIntendedStudyID'] = $scope.intendedStudy[count].collegeIntendedStudyID;
        //     finalAdmissionObject['intendedStudyName'] = $scope.intendedStudy[count].intendedStudyName;
        //     finalAdmissionObject['intendedStudyType'] = $scope.intendedStudy[count].intendedStudyType;
        //     finalAdmissionObject['intendedStudyPercentage'] = $scope.intendedStudy[count].intendedStudyPercentage;

        //     finalAdmissionData.push(finalIntendedStudyObject);
        // }
        // console.log('final array IntendedStudy', finalAdmissionData);

        // editCollegeAPI.saveIntendedStudyDetail(finalIntendedStudyData)
        //     .then(
        //         function(data) {
        //             console.log('save detail IntendedStudy====>', data);
        //         });

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
        if(index == -1){
            // push to array
            $scope.similarSchoolsArray.push(data.collegeId);
            // background color
            event.target.style.backgroundColor = "blue";
        }else{
            // element to remove from array
            $scope.similarSchoolsArray.splice(index,1);
            // background color
            event.target.style.backgroundColor = "transparent";
        }
    }

    $scope.similarSchoolsSelectedArray = [];
    //Right Button Clicked

     $scope.selectedSimilarSchools = function() {
debugger;
        var similarSchoolsArray = $scope.similarSchoolsArray;
        console.log('selectedSimilarSchools ======>', similarSchoolsArray);

        var colgData = $scope.collegedata;
        for (var i = 0; i < similarSchoolsArray.length; i++) {
            
            console.log(similarSchoolsArray[i]);// number

            for (var j = 0; j < colgData.length; j++) {
                console.log(colgData[j].collegeId);
                if(colgData[j].collegeId == similarSchoolsArray[i]){
                    var obj = {};
                    obj.collegeId = similarSchoolsArray[i];
                    obj.collegeName = colgData[j].collegeName;

                    $scope.similarSchoolsSelectedArray.push(obj);
                }
            };
        }
        $scope.similarSchoolsArray  = [];
    };

    $scope.deleteSelectedSchool = function(item) {
        alert('delete selected school==>'+ item.collegeId);

        for (var i = 0; i <  $scope.similarSchoolsSelectedArray.length; i++) {
            if( $scope.similarSchoolsSelectedArray[i].collegeId == item.collegeId ){
                 $scope.similarSchoolsSelectedArray.splice(i,1);
            }
        };
        
    };



}]);

/*-----  End of Controller = CollegeCtrl  ------*/
