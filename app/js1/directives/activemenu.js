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