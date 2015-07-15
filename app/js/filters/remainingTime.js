/*================================================================
=>                   Filter = remainingTime
==================================================================*/
/*global app*/

app.filter('remainingTime', function () {
	
	'use strict';

	return function (data) {
		//var dateDiff = 0;
		var finalDate = 0;
		//for(var count = 0; count < data.length; count++) {
			//dateDiff = data[count].endDate - data[count].startDate;
			//console.log(dateDiff);
			var mydate = new Date(data);
			console.log('mydate',mydate);
			finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			console.log('finalDate',finalDate);
			return finalDate;
		//console.log('in filter ',data);
		
	};
});


/*-----  End of Filter = remainingTime  ------*/