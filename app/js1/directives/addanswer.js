/*================================================================
Directive = addAnswer
==================================================================*/
/*global app,$*/
app.directive('addAnswer', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.ans = [];
            $(element).on('click', function() {
                counter++;
                var inputEle = $compile('<div class="form-group answer-div-' + counter + '"><div class="col-xs-10"><input type="text" class="form-control" placeholder="Enter Here" ng-model="ans[' + counter + ']" id="answer-' + counter + '"/></div><div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedAns(' + counter + ')">X</div></div>')(scope);
                $('.answer-container').append(inputEle);
                $('#answer-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            //<div class="form-group answer-div-'+counter+'"><div class="col-xs-1"><input type="checkbox" name="ans-'+counter+'" id="ans--'+counter+'"></div><div class="col-xs-8"><input type="text" class="form-control" placeholder="Enter Answer Here" ng-model="ans['+counter+']" id="answer-'+counter+'"/></div><div style="cursor: pointer;  margin: 9px 2px;" class="col-xs-1 closeLang'+counter+'" ng-click="delSelectedAns('+counter+')">X</div></div>
            /*$('div').on('click', '.closeLang', function ($event) {
				console.log('$event',$event);
		        $event.preventDefault();
		         $(this).parent().prev().prev().remove();
		         $(this).parent().prev().remove();
		        $(this).parent().remove();
    		});*/

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addAnswer');
        }
    };

}]);

/*-----  End of Directive = addAnswer  ------*/
