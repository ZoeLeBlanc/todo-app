"use strict";

var FbAPI = ( (oldFirebase)=>{

	oldFirebase.getTodos = (apiKeys)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'GET',
				url:`${apiKeys.databaseURL}/items.json`
			}).then( (response)=>{
				let items = [];
				Object.keys(response).forEach( (key)=> {
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(items);
			},(error)=>{
				reject(error);
			});
		});
	};
	oldFirebase.addTodo = (apiKeys, newItem)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'POST',
				url:`${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newItem),
				dataType: 'json'
			}).then( (response)=>{
				console.log("response", response);
				resolve(response);
			},(error)=>{
				reject(error);
			});
		});
	};
	oldFirebase.editTodo = (apiKeys, itemID, editItem) =>{
		return new Promise( (resolve, reject)=>{
			$.ajax({
				method: 'PUT',
				url: `${apiKeys.databaseURL}/items/${itemID}.json`,
				data: JSON.stringify(editItem),
				dataType: 'json'
			}).then( (response)=>{
				console.log("response from PUT", response);
				resolve(response);
			}, (error)=>{
				reject(error);
			});
			
		});
	};
	oldFirebase.deleteTodo = (apiKeys , itemID)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'DELETE',
				url:`${apiKeys.databaseURL}/items/${itemID}.json`
			}).then( (response)=>{
				console.log("response from delete", response);
				resolve(response);
			},(error)=>{
				console.log("error from delete", error);
				reject(error);
			});
		});
	};
	return oldFirebase;

})(FbAPI || {});