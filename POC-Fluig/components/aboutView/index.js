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
            var localDataProvider = app.data.localStorage;
            localDataProvider.clear();
            localDataProvider.sync();
            app.notification.show('Dados apagados!','info');
            app.mobileApp.navigate('#:back');
        }
    });
    parent.set('aboutViewModel', aboutViewModel);
})(app.aboutView);