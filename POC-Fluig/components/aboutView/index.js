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
            var db = localStorage['contacts'];
            db.clear();
            db.sync();
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('#:back');
            window.location.reload();
            app.notification.show('Dados apagados!','info');
        }
    });
    parent.set('aboutViewModel', aboutViewModel);
})(app.aboutView);