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