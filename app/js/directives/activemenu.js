/*================================================================
Directive = activeMenu
==================================================================*/

app.directive('activeMenu', ['$rootScope', function ($rootScope) {
'use strict';

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var popupStatus = 0;


    $(".Login_PopUp_Link").click(function() {

        //Aligning our box in the middle
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $("#popupLogin").height();
        var popupWidth = $("#popupLogin").width();
        //centering
        $("#popupLogin").css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2,
            "left": windowWidth / 2 - popupWidth / 2
        });

        //aligning our full bg 
        $("#LoginBackgroundPopup").css({
            "height": windowHeight
        });


        // Pop up the div and Bg
        if (popupStatus == 0) {
            $("#LoginBackgroundPopup").css({
                "opacity": "0.7"
            });
            $("#LoginBackgroundPopup").fadeIn("slow");
            $("#popupLogin").fadeIn("slow");
            popupStatus = 1;
        }


    });


    //Close Them
    $("#popupLoginClose").click(function() {
        if (popupStatus == 1) {
            $("#LoginBackgroundPopup").fadeOut("slow");
            $("#popupLogin").fadeOut("slow");
            popupStatus = 0;
        }
    });

		}
	};

}]);

/*-----  End of Directive = activeMenu  ------*/