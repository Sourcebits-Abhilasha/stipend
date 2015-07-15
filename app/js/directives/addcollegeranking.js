/*================================================================
Directive = addCollegeRanking
==================================================================*/
/*global app,$*/
app.directive('addCollegeRanking', ['$rootScope', '$compile', function($rootScope, $compile) {
    'use strict';

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var counter = 0;
            scope.clgRankingArray = [];
            scope.clgRankingPointsArray = [];
            $(element).on('click', function() {
                counter++;
                var clgRank = $compile('<div class="form-group college-ranking-' + counter + '">' +
                    '<div class="col-xs-5">' +
                    '<input type="text" class="form-control" placeholder="Enter Here" ng-model="clgRankingArray[' + counter + ']" id="rank-' + counter + '"/>' +
                    '</div>' +
                    '<div class="col-xs-5">' +
                    '<input type="text" class="form-control" placeholder="Enter Here" ng-model="clgRankingPointsArray[' + counter + ']" id="rank-' + counter + '"/>' +
                    '</div>' +
                    '<div style="cursor: pointer;  margin: 9px 2px; color:#000;" class="col-xs-1 closeLang' + counter + '" ng-click="delSelectedCollegeRanking(' + counter + ')">X</div></div>')(scope);
                $('.college-ranking').append(clgRank);
                $('#rank-' + counter).focus();
                //scope.ans.push(scope.ans+counter);
            });

            $('div').on('click', '.test', function($event) {
                console.log('$event', $event);
                // $event.preventDefault();
                //  $(this).parent().prev().prev().remove();
                //  $(this).parent().prev().remove();
                // $(this).parent().remove();
            });



            console.log('Directive === addCollegeRanking');
        }
    };

}]);

/*-----  End of Directive = addCollegeRanking  ------*/
