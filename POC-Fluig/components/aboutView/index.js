//logica da tela about
'use strict';

app.aboutView = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        app.mobileApp.hideLoading();
    }
});

(function(parent) {
    var aboutViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        },
        clearLocalData: function(){
            app.mobileApp.showLoading();
			localStorage["contacts"] = JSON.stringify([]);
            window.location.reload();
            app.mobileApp.hideLoading();
            app.notification.show('Dados apagados!','info');
        }
    });
    parent.set('aboutViewModel', aboutViewModel);
})(app.aboutView);