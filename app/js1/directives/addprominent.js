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
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addProminent');
        }
    };

}]);

/*-----  End of Directive = addProminent  ------*/
