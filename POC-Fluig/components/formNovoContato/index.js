'use strict';

app.formNovoContato = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_formNovoContato
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_formNovoContato
(function(parent) {
    var dataProvider = app.data.randomUser,
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

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    dataItem['user.picture.mediumUrl'] =
                        processImage(dataItem['user.picture.medium']);

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
                        'user.email': {
                            field: 'user.email',
                            defaultValue: ''
                        },
                        'user.picture.medium': {
                            field: 'user.picture.medium',
                            defaultValue: ''
                        },
                    },
                    icon: function() {
                        var i = 'globe';
                        return kendo.format('km-icon km-{0}', i);
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        formNovoContatoModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/formNovoContato/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = formNovoContatoModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                itemModel.user.picture.mediumUrl = processImage(itemModel.user.picture.medium);
                if (!itemModel.user.name.first) {
                    itemModel.user.name.first = String.fromCharCode(160);
                }
                formNovoContatoModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('formNovoContatoModel', formNovoContatoModel);
        });
    } else {
        parent.set('formNovoContatoModel', formNovoContatoModel);
    }
})(app.formNovoContato);

// START_CUSTOM_CODE_formNovoContatoModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_formNovoContatoModel