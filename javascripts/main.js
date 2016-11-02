"use strict";
let apiKeys = {};
function putTodoInDOM(){
	FbAPI.getTodos(apiKeys).then((items)=> {
			$("#completed-tasks").html("");
			$("#incomplete-tasks").html("");
			console.log("items from firebase", items);
			items.forEach((item)=>{	
      		//apend to list
      			if (item.isCompleted === true){
      				let newListItem = `<li data-completed="${item.isCompleted}"><div class="col-xs-8" data-fbid="${item.id}"><input class="checkboxStyle" type="checkbox" checked="true"><label class="inputLabel">${item.task}</label></div></li>`;
      				$('#completed-tasks').append(newListItem);
      			} else {
      				let newListItem = `<li data-completed="${item.isCompleted}"><div class="col-xs-8" data-fbid="${item.id}"><input class="checkboxStyle" type="checkbox"><label class="inputLabel">${item.task}</label><input type="text" class="inputTask"></div><div class="col-xs-4"><button class="btn btn-default col-xs-6 edit" data-fbid="${item.id}">Edit</button><button class="btn btn-danger col-xs-6 delete" data-fbid="${item.id}">Delete</button></div></li>`;
      					$('#incomplete-tasks').append(newListItem);

      				}
      		});
		});
}

$(document).ready( ()=> {
	//get API keys
	FbAPI.firebaseCredentials().then( (keys)=> {
		console.log("keys", keys);
		apiKeys = keys;
		firebase.initializeApp(keys);
		putTodoInDOM();
	});
	//Add new todo item on enterkey
	$("#add-todo-text").on("keypress", (event)=>{
		if (event.which === 13){
			let newItem = {
			"task": $("#add-todo-text").val(),
			"isCompleted": "false"
			};
			FbAPI.addTodo(apiKeys, newItem).then( ()=>{
				putTodoInDOM();
			});
			$("#add-todo-text").val("");
		}
	});
	//Add new todo item on click
	$("#add-todo-button").on("click", function(event){
		let newItem = {
			"task": $("#add-todo-text").val(),
			"isCompleted": false
		};
		FbAPI.addTodo(apiKeys, newItem).then( ()=>{
			putTodoInDOM();
		});
		$("#add-todo-text").val("");
	});
	//Delete item
	$("ul").on("click", ".delete",function(){
		let itemId = $(this).data("fbid");
		console.log("itemId",itemId);
		FbAPI.deleteTodo(apiKeys, itemId).then( ()=>{
			putTodoInDOM();
		});
		
	});
	//Edit item
	$("ul").on("click", ".edit",function(){
		let parent = $(this).closest("li");
		if (!parent.hasClass("editMode")){
			parent.addClass("editMode");
		} else {
			let itemId = $(this).data("fbid");
			let editedItem = {
				"task": parent.find(".inputTask").val(),
				"isCompleted": false		
			};
			FbAPI.editTodo(apiKeys, itemId, editedItem).then( (response)=>{
				console.log("response from Edit", response);
				parent.removeClass("editMode");
				putTodoInDOM();
			});
		}
	});
	//Checkbox click
	$("ul").on("change", "input[type='checkbox']", function(){
		let updatedIsCompleted = $(this).closest("li").data("completed");
		let itemId = $(this).parent().data("fbid");
		let taskClick = $(this).siblings(".inputLabel").html();
		let editedItem = {
			"task": taskClick,
			"isCompleted": !updatedIsCompleted
		};
		FbAPI.editTodo(apiKeys, itemId, editedItem).then( (response)=>{
			putTodoInDOM();
		});
	});

});

// //variables
// var incompleteList = $("#toDoList");
// var completeList = $("#completedList");
// $(document).ready(()=>{
// 	ToDoList.loadTodoList();

// //Get User Input for To Do Item
// 	$('#input-todo').keypress( (event)=>{
// 		if (event.which == 13){
// 			let enteredToDo = $('#input-todo').val();
// 			console.log("event", event);
// 			console.log("enteredToDo", enteredToDo);
// 			ToDoList.addToDoListItem(enteredToDo);
// 		} 
// 	});
// 	$('#getToDo-button').on("click", (event)=>{
// 		let enteredToDo = $('#input-todo').val();
// 		ToDoList.addToDoListItem(enteredToDo);
// 	});
	
	
// });
// //Add buttons and push to DOM
// function printList(listItems){
// 	completeList.html("");
// 	incompleteList.html("");
// 	console.log("listItems", listItems);
// 	$.each(listItems, (index, item)=> {
// 		if (item.completed == "true"){
// 			completeList.append(`<div class="card" id="${index}"><div class="form-check"><input class="form-check-input "type="checkbox" value="" checked="true"><p
// 		  			 	class="card-text"><del>Item: ${
// 		  			 	item.item}</del></p></div><button
// 		  			 	type="submit" class="btn 
// 		  			 	btn-primary" id="deleteBtn">
// 		  			 	Delete Item</button><button 
// 		  			 	type="submit" class="btn 
// 		  			 	btn-primary" id="editBtn">
// 		  			 	Edit Item</button></div>`);
// 		} else {
// 			incompleteList.append(`<div class="card" id="${index}"><div class="form-check">
// 		  			 	<input 
// 		  			 	class="form-check-input"
// 		  			 	type="checkbox" value="" checked="false"><p
// 		  			 	class="card-text">Item: ${
// 		  			 	item.item}</p></div><button
// 		  			 	type="submit" class="btn 
// 		  			 	btn-primary" id="deleteBtn">
// 		  			 	Delete Item</button><button 
// 		  			 	type="submit" class="btn 
// 		  			 	btn-primary" id="editBtn">
// 		  			 	Edit Item</button></div>`);
// 				}
// 	});
// }
// //Get user clicks
// 	//Change in check value
// $(document).on("click", (event)=>{
// 		console.log("event", event.target.parentNode);
// 		//Delete item
// 		if (event.target.id === "deleteBtn") {
// 			let removeItem = event.target.parentNode;
// 			let removeId = event.target.parentNode.id;
// 			List.removeFromDom(removeItem);
// 			List.removeFromArray(removeId);
// 		}
// 		//Edit item
// 		if (event.target.id === "editBtn"){
// 			let editId = event.target.parentNode.id;
// 			let editParagraph = event.target.parentNode.children[0];
// 			let editItem = editParagraph.children[1].innerHTML;
// 			$("#input-todo").value = editItem;
// 			List.editFromArray(editId, editItem);
// 		}
// 		// if (event.target.type === "checkbox"){
// 		// 	if (event.target.checked === "false"){

// 		// 	}
// 		// }
// 		//Move item to Completed


// });



// //Move item to Completed

// //Move item back to ToDo

