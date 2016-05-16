// logica do local binding
'use strict';

(function () {
	// cria o localStorage se não estiver definido
	if(localStorage["contacts"] == undefined){
		localStorage["contacts"] = JSON.stringify([]);
	}

	// seta o dataSource como variável global
	var provider = app.data.localStorage = new kendo.data.DataSource({
		transport: {
			create: function(options){
				console.log('create:',options);
				//função que cria registro local
				options.data.ID = options.data.login.username;
				var localData = JSON.parse(localStorage["contacts"]);
				localData.push(options.data);
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(options.data);
			},
			read: function(options){
				// pega o array de contatos gravados localmente
				var localData = JSON.parse(localStorage["contacts"]);
				console.log('read:',localData);
				options.success(localData);
			},
			destroy: function(options){
				//apaga registro

				console.log('delete',options.data);
				var localData = JSON.parse(localStorage["contacts"]);
				for(var i=0; i<localData.length; i++){
					if(options.data.ID === localData[i].ID){
                console.log(options);
				var localData = JSON.parse(localStorage["contacts"]);
				for(var i=0; i<localData.length; i++){
					if(options.data.email === localData[i].email){
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
				id: 'ID'
			}
		}
	});
})();