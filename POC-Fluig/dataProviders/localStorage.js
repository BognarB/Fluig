'use strict';

function setTestData(){
	localStorage["contacts"] = JSON.stringify([]);
}

function reset(){
	setTestData();
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
					if(localData[i] === options.data){
						localData.splice(i,1);
						break;
					}
				}
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(localData);
			}
		},
		schema: {
			model: {
				id: "ID",
				fields: {
					ID: { type: "number", editable: false },
					Value: { type: "string" }
				}
			}
		}
	}
	);




	/*

	function setContactsData(array){
		if(array){
			console.log('Setting new Contact');
			localStorage.setItem('contacts',JSON.stringify(array));
		} else {
			console.log('Setting Contacts');
			localStorage.setItem('contacts',JSON.stringify([]));
		}

	}

	// localStorage.clear();
	console.log(localStorage.getItem('contacts'));
	if (!localStorage.getItem('contacts')) setContactsData();


	var provider = app.data.localStorage = new kendo.data.DataSource({
		transport: {
			create: function(options){
				console.log(options);
				var contacts = JSON.parse(localStorage.getItem('contacts'));
				contacts.push(options.data);
				setContactsData(contacts);
				options.success(options.data);
			},
			read: function(options){
				var contacts = JSON.parse(localStorage.getItem('contacts'));
				options.success(contacts);
			},
			destroy: function(options){
				var contacts = JSON.parse(localStorage.getItem('contacts'));
				for(var i=0; i< contacts.length; i++){
					if(contacts[i].ID === options.data.ID){
						contacts.splice(i,1);
						break;
					}
				}
				setContactsData(contacts);
				options.success(contacts);
			},
		}
	});
	*/




})();
