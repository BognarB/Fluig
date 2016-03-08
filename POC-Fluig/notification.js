// habilitando o notification do kendo-ui
$(document).ready(function(){
	if(!app) app = {};
	app.notification = $("#popUpNotification").kendoNotification(  {
        position: {
			top: 100,
			right: 70
		},
        autoHideAfter: 2000
    }).data("kendoNotification");
});