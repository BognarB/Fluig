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
            app.localStorage.clear();
            app.localStorage.sync();
            app.mobileApp.navigate('#:back');
            app.notification.show('Dados apagados!','info');
            app.mobileApp.hideLoading();
        }
    });
    parent.set('aboutViewModel', aboutViewModel);
})(app.aboutView);