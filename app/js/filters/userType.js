/*================================================================
=>                   Filter = userType
==================================================================*/
/*global app*/

app.filter('userType', function () {
	
	'use strict';

	return function (data) {
		//var dateDiff = 0;
		console.log('data',data);
		if (data == 1) {
			return 'male';
		}else if (data == 2) {
			return 'female';
		} else {
			return data;
		}
	};
});


/*-----  End of Filter = userType  ------*/