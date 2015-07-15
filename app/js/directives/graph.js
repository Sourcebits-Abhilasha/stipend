/*================================================================
Directive = graphCanvasRefresh
==================================================================*/
/*global app,$*/
app.directive('graphCanvasRefresh', ['$compile', function($compile) {
function link(scope, elem, attrs) {


console.log('scope graphCanvasRefresh',scope.data);
    function refreshDOM() {
        var markup = '<canvas class="chart chart-pie" height="100" width="100" id="graph" data="data" labels="labels" legend="true" colours="graphColours" ></canvas>';
        var el = angular.element(markup);
        compiled = $compile(el);
        elem.html('');
        elem.append(el);
        compiled(scope);
    };

    // Refresh the DOM when the attribute value is changed
    scope.$watch(attrs.graphCanvasRefresh, function(value) {
        refreshDOM();
    });

    // Clean the DOM on destroy
    scope.$on('$destroy', function() {
        elem.html('');
    });
};

return  {
    link: link
};
}]);
/*-----  End of Directive = graphCanvasRefresh  ------*/