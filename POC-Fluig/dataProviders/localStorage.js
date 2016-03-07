'use strict';

function setTestData(){
	localStorage["contacts"] = JSON.stringify([]);
}

function reset(){
	setTestData();
	window.location.reload();
}

(function () {
	if(localStorage["contacts"] == undefined){
		setTestData();
	}
	var provider = app.data.localStorage = new kendo.data.DataSource({
		transport: {
			create: function(options){
				var localData = JSON.parse(localStorage["contacts"]);
				localData.push(options.data);
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(options.data);
			},
			read: function(options){
				var localData = JSON.parse(localStorage["contacts"]);
				options.success(localData);
			},
			destroy: function(options){
				var localData = JSON.parse(localStorage["contacts"]);
				for(var i=0; i<localData.length; i++){
					if(options.data.username === localData[i].username){
						localData.splice(i,1);
						break;
					}
				}
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(options.data);
			}
		},
		schema: {
			model: {
				id: "ID",
				fields: {
					ID: { type: "number", editable: false }
				}
			}
		}
	});
})();