/*================================================================
Filter = convertMiliSecondsIntoDate
==================================================================*/

app.filter('convertMiliSecondsIntoDate', function () {
	'use strict';

	return function (input) {

		var mydate = new Date(input);
			//finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			//console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			var month = mydate.getMonth();
			//month = month.parseInt();
			month = month +1;
			mydate = mydate.getDate()+'/'+ month  +'/'+ mydate.getUTCFullYear();
			console.log('mydate',mydate);	
			return mydate;
		console.log('Filter == convertMiliSecondsIntoDate');

		
	};
});

app.filter('convertMiliSecondsIntoDate1', function () {
	'use strict';

	return function (input) {

		var mydate = new Date(input);
			//finalDate = mydate.getDay()+" day, "+mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes";
			//console.log(mydate.getUTCHours()+" hours, "+mydate.getUTCMinutes()+" minutes");
			//$scope.timesData.push(finalDate);
			var month = mydate.getMonth();
			//month = month.parseInt();
			month = month +1;
			mydate = mydate.getDate()+'/'+ month  +'/'+ mydate.getUTCFullYear();
			console.log('mydate',mydate);	
			return mydate;
		console.log('Filter == convertMiliSecondsIntoDate');

		
	};
});

/*-----  End of Filter = convertMiliSecondsIntoDate  ------*/
