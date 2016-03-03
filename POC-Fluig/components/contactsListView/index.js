'use strict';

app.contactsListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        app.mobileApp.hideLoading();
    }
});

// START_CUSTOM_CODE_contactsListView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_contactsListView
(function(parent) {
    var 
    dataProvider = app.data.ramdomUser,
    localDataProvider = app.data.localStorage,
    processImage = function(img) {
        if (!img) {
            var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
            img = 'data:image/png;base64,' + empty1x1png;
        }

        return img;
    },
    contactsListViewModel = kendo.observable({
        dataSource: localDataProvider,
        itemClick: function(e) {
            app.mobileApp.navigate('#components/contactsListView/details.html?uid=' + e.dataItem.uid);
        },
        deleteClick: function() {
            var dataSource = contactsListViewModel.get('dataSource');

            dataSource.remove(this.currentItem);

            dataSource.one('sync', function(e) {
                app.mobileApp.navigate('#:back');
            });

            dataSource.one('error', function() {
                dataSource.cancelChanges();
            });

            dataSource.sync();
        },
        detailsShow: function(e) {
            var item = e.view.params.uid,
            dataSource = contactsListViewModel.get('dataSource'),
            itemModel = dataSource.getByUid(item);
            itemModel.picture.mediumUrl = processImage(itemModel.picture.large);

            if (!itemModel.name.first) {
                itemModel.name.first = String.fromCharCode(160);
            }

            contactsListViewModel.set('currentItem', null);
            contactsListViewModel.set('currentItem', itemModel);
        },
        currentItem: null
    });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('contactsListViewModel', contactsListViewModel);
        });
    } else {
        parent.set('contactsListViewModel', contactsListViewModel);
    }
})(app.contactsListView);

// START_CUSTOM_CODE_contactsListViewModel
// END_CUSTOM_CODE_contactsListViewModel