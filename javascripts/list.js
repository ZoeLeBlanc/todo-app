"use strict";
// var ToDoList = ( function() {

// 	var todoItems = [];
	
// 	return {
// 		loadTodoList: ()=>{
// 				$.ajax({
// 					url: "todo.json"
// 				}).done( (response)=> {
// 					todoItems = response.todo;
// 					printList(todoItems);			
// 				}).fail( (error)=>{
// 					console.log("error", error);
// 				});
// 		},
// 		addToDoListItem: (item)=>{
// 				todoItems.push({'item':item, 'completed':'false'});
// 				printList(todoItems);
// 		},
// 		removeFromDOM: (DOMId)=>{
//      			let parent = DOMId.parentNode;
//       			DOMId.remove();
//       // parent.remove(DOMId);
//     	},
//     	removeFromArray: (itemId)=>{
//       			let index = todoItems.indexOf(itemId);
//           		todoItems.splice(index, 1);   
//     	},
//     	editFromArray: (itemId, newItem)=>{
//     			let index = todoItems.indexOf(itemId);
//     			todoItems[index].item = newItem;
//     	}		
// 	};
// })();