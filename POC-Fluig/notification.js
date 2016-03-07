$(document).ready(function(){
	if(!app) app = {};
	app.notification = $("#popUpNotification").kendoNotification(  {position: {
		bottom: 100,
		right: 70
	}}).data("kendoNotification");
});