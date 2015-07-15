/*================================================================
Directive = addCalendar
==================================================================*/
/*global app,$*/
app.directive('addCalendar', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.calendarEventNameArray = [];
            scope.calendarEventDateArray = [];
            $(element).on('click', function() {
                counter++;
                var test = $compile('<div class="form-group calendar-div-' + counter + '">'+
                   '<div class="col-sm-5"> <div class="form-group"><label for="calendarEventName" class="col-sm-5 control-label lable-font">Event Name</label>'+
                    '<div class="col-sm-7"><input type="text" class="form-control" placeholder="Enter Here" ng-model="calendarEventNameArray[' + counter + ']" id="calendarEventName-' + counter + '"/>'+
                    '</div></div></div>'+

                    '<div class="col-sm-5"><div class="form-group"><label for="calendarEventDate" class="col-sm-5 control-label lable-font">Event Date</label>'+
                                '<div class="col-sm-7"><input type="text" class="form-control" placeholder="Enter Here" ng-model="calendarEventDateArray[' + counter + ']" id="calendarEventDate-' + counter + '"/>'+
                    '</div></div></div>'+
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedCalendar(' + counter + ')">X</div>'+
                    '</div>')(scope);
                $('.calendar-div').append(test);
                $('#eventCalendar-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });


                


            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addCalendar');
        }
    };

}]);

/*-----  End of Directive = addCalendar  ------*/
