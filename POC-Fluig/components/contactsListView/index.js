'use strict';

app.contactsListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_contactsListView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_contactsListView
(function(parent) {
    var dataProvider = app.data.ramdomUser,
        processImage = function(img) {
            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            }

            return img;
        },
        dataSourceOptions = {
            type: 'json',
            transport: {
                read: {
                    url: dataProvider.url
                }
            },

            error: function(e) {
                if (e.xhr) {
                    alert(JSON.stringify(e.xhr));
                }
            },
            schema: {
                data: 'results',
                model: {
                    fields: {
                        'user.name.first': {
                            field: 'user.name.first',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        contactsListViewModel = kendo.observable({
            dataSource: dataSource,
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
                itemModel.user.picture.mediumUrl = processImage(itemModel.user.picture.medium);

                if (!itemModel.user.name.first) {
                    itemModel.user.name.first = String.fromCharCode(160);
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