/*================================================================
Directive = datepicker
==================================================================*/
/*global app,$*/

app.directive('dateTimePicker', ['$rootScope', function ($rootScope) {
'use strict';

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			    $( "#datepicker" ).datepicker({
			      changeMonth: true,
			      changeYear: true
			    });
			 
			// $(element).on('click', function() {
			// 	console.log('m in date picker');
			// 	// var ngModel = $(this).attr('ng-model'); //getting ng-model name
			// 	// console.log(event.target.value)
			// 	// scope[ngModel] = event.target.value; //update the new value to ng-model
			// 	// scope.$apply();
			// 	$(element).datepicker( );
			// });
			
			console.log('Directive === datepicker');
		}

	};

}]);


/*-----  End of Directive = datepicker  ------*/
