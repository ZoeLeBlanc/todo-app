"use strict";
//variables
var incompleteList = $("#toDoList");
var completeList = $("#completedList");
$(document).ready(()=>{
	ToDoList.loadTodoList();

//Get User Input for To Do Item
	$('#input-todo').keypress( (event)=>{
		if (event.which == 13){
			let enteredToDo = $('#input-todo').val();
			console.log("event", event);
			console.log("enteredToDo", enteredToDo);
			ToDoList.addToDoListItem(enteredToDo);
		} 
	});
	$('#getToDo-button').on("click", (event)=>{
		let enteredToDo = $('#input-todo').val();
		ToDoList.addToDoListItem(enteredToDo);
	});
	
	
});
//Add buttons and push to DOM
function printList(listItems){
	completeList.html("");
	incompleteList.html("");
	console.log("listItems", listItems);
	$.each(listItems, (index, item)=> {
		if (item.completed == "true"){
			completeList.append(`<div class="card" id="${index}"><div class="form-check"><input class="form-check-input "type="checkbox" value="" checked="true"><p
		  			 	class="card-text"><del>Item: ${
		  			 	item.item}</del></p></div><button
		  			 	type="submit" class="btn 
		  			 	btn-primary" id="deleteBtn">
		  			 	Delete Item</button><button 
		  			 	type="submit" class="btn 
		  			 	btn-primary" id="editBtn">
		  			 	Edit Item</button></div>`);
		} else {
			incompleteList.append(`<div class="card" id="${index}"><div class="form-check">
		  			 	<input 
		  			 	class="form-check-input"
		  			 	type="checkbox" value="" checked="false"><p
		  			 	class="card-text">Item: ${
		  			 	item.item}</p></div><button
		  			 	type="submit" class="btn 
		  			 	btn-primary" id="deleteBtn">
		  			 	Delete Item</button><button 
		  			 	type="submit" class="btn 
		  			 	btn-primary" id="editBtn">
		  			 	Edit Item</button></div>`);
				}
	});
}
//Get user clicks
	//Change in check value
$(document).on("click", (event)=>{
		console.log("event", event.target.parentNode);
		//Delete item
		if (event.target.id === "deleteBtn") {
			let removeItem = event.target.parentNode;
			let removeId = event.target.parentNode.id;
			List.removeFromDom(removeItem);
			List.removeFromArray(removeId);
		}
		//Edit item
		if (event.target.id === "editBtn"){
			let editId = event.target.parentNode.id;
			let editParagraph = event.target.parentNode.children[0];
			let editItem = editParagraph.children[1].innerHTML;
			$("#input-todo").value = editItem;
			List.editFromArray(editId, editItem);
		}
		// if (event.target.type === "checkbox"){
		// 	if (event.target.checked === "false"){

		// 	}
		// }
		//Move item to Completed


});



//Move item to Completed

//Move item back to ToDo

