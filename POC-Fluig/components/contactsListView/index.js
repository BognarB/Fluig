'use strict';

app.contactsListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_contactsListView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_contactsListView
(function(parent) {
    var dataProvider = app.data.pocFluig,
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Contact',
                dataProvider: dataProvider
            },

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    flattenLocationProperties(dataItem);
                }
            },
            error: function(e) {
                if (e.xhr) {
                    alert(JSON.stringify(e.xhr));
                }
            },
            schema: {
                model: {
                    fields: {
                        'Name': {
                            field: 'Name',
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

                if (!itemModel.Name) {
                    itemModel.Name = String.fromCharCode(160);
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