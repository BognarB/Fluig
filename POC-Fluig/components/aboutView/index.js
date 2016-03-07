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
            app.notification.show('Dados apagados!','info');
			var dataSource = aboutViewModel.get('dataSource'),
			
            dataSource.clear();
            app.mobileApp.navigate('#:back');
        }
    });
    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('aboutViewModel', aboutViewModel);
        });
    } else {
        parent.set('aboutViewModel', aboutViewModel);
    }
})(app.aboutView);