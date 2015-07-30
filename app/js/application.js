

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

    console.log('Angular.js run() function...');

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.currentState = toState.name;
        
        console.log('state --->', toState.name,$.cookie('NAME'));
        
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
    baseURL : 'http://ec2-52-10-5-217.us-west-2.compute.amazonaws.com:8080/Stipend' 
    // baseURL : 'http://192.168.11.134:8085/Stipend'
    
});
