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
