$(document).ready(function(){
	if(!app) app = {};
	app.notification = $("#popUpNotification").kendoNotification(  {
        position: {
			top: 100,
			right: 70
		},
        autoHideAfter: 3000
    }).data("kendoNotification");
});