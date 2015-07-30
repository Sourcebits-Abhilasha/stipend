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