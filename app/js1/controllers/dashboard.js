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


