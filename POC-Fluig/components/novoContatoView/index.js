'use strict';

app.novoContatoView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_novoContatoView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_novoContatoView
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

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    dataItem['user.picture.thumbnailUrl'] =
                        processImage(dataItem['user.picture.thumbnail']);

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
                        'user.name.last': {
                            field: 'user.name.last',
                            defaultValue: ''
                        },
                        'user.picture.thumbnail': {
                            field: 'user.picture.thumbnail',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        novoContatoViewModel = kendo.observable({
            dataSource: dataSource
        });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('novoContatoViewModel', novoContatoViewModel);
        });
    } else {
        parent.set('novoContatoViewModel', novoContatoViewModel);
    }
})(app.novoContatoView);

// START_CUSTOM_CODE_novoContatoViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_novoContatoViewModel