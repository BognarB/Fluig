'use strict';

(function() {

	



	function setContactsData(array){
		
		if(!array){
			console.log('Setting Contacts');
			localStorage.setItem('contacts',JSON.stringify([]));
		}else {
			localStorage.setItem('contacts',JSON.stringify(array));
		}
	}

	if (!localStorage.getItem('conacts')) setContactsData();


	var provider = app.data.localStorage = new kendo.data.DataSource({
		transport: {
			create: function(options){
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

}());
