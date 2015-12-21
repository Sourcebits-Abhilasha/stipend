/*================================================================
=>                   Filter = userTypeFilter
==================================================================*/
/*global app*/

app.filter('userTypeFilter', function() {

    'use strict';

    return function(data) {
        //var dateDiff = 0;
        // console.log('data', data);
        if (data == 1) {
            return 'Freshman';
        } else if (data == 2) {
            return 'Sophomore';
        } else if (data == 3) {
            return 'Junior';
        } else if (data == 4) {
            return 'Senior';
        } else if (data == 5) {
            return 'Parent';
        } else if (data == 6) {
            return 'Counselor';
        }else {
            return data;
        }
    };
});


/*-----  End of Filter = userTypeFilter  ------*/
