/*================================================================
Directive = addAddress
==================================================================*/
/*global app,$*/
app.directive('addAddress', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.websiteNameArray = [];
            scope.websiteURLArray = [];
            $(element).on('click', function() {
                counter++;
                var address = $compile('<div class="form-group college-address-div-' + counter + '">'+
                    '<div class="col-xs-5">'+
                        '<input type="text" class="form-control" placeholder="Enter Here" ng-model="websiteNameArray[' + counter + ']" id="collegeAddress-' + counter + '"/>'+
                    '</div>'+
                    '<div class="col-xs-5">'+
                        '<input type="text" class="form-control" placeholder="Enter Here" ng-model="websiteURLArray[' + counter + ']" id="collegeAddress-' + counter + '"/>'+
                    '</div>'+
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedLinkAndAddress(' + counter + ')">X</div></div>')(scope);
                $('.college-address').append(address);
                $('#collegeAddress-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addAddress');
        }
    };

}]);

/*-----  End of Directive = addAddress  ------*/
