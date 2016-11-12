"use strict";
let apiKeys = {};
let uid = "";
function putTodoInDOM(){
	FbAPI.getTodos(apiKeys, uid).then((items)=> {
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
function createLogoutButton(){
	FbAPI.getUser(apiKeys, uid).then( (userResponse)=>{
		$("#logout-container").html("");
		console.log("userResponse", userResponse);
		let currentUsername = userResponse.username;
		let logoutButton = `<button class="btn btn-danger btn-md" id="logoutButton">Logout ${currentUsername}</button>`;
		$("#logout-container").append(logoutButton);
	});
}

$(document).ready( ()=> {
	//get API keys
	FbAPI.firebaseCredentials().then( (keys)=> {
		console.log("keys", keys);
		apiKeys = keys;
		firebase.initializeApp(keys);
	});
	//Add new todo item on enterkey
	$("#add-todo-text").on("keypress", (event)=>{
		if (event.which === 13){
			let newItem = {
			"task": $("#add-todo-text").val(),
			"isCompleted": false,
			"uid": uid
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
			"isCompleted": false,
			"uid": uid
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
				"isCompleted": false,
				"uid": uid		
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
			"isCompleted": !updatedIsCompleted,
			"uid": uid
		};
		FbAPI.editTodo(apiKeys, itemId, editedItem).then( (response)=>{
			putTodoInDOM();
		});
	});
	//Register Button
	$("#registerButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let username = $("#inputUsername").val();
		let user = {
			"email": email,
			"password": password
		};
		FbAPI.registerUser(user).then( (registerResponse)=>{
			console.log("response from register", registerResponse);
			let newUser = {
				"username": username,
				"uid": registerResponse.uid
			};
			return FbAPI.addUser(apiKeys, newUser);
		}).then( (userResponse)=>{
			console.log("userResponse", userResponse);
			return FbAPI.loginUser(user);
		}).then( (loginResponse)=>{
			console.log("response from login/register", loginResponse);
			uid = loginResponse.uid;
			createLogoutButton();
			putTodoInDOM();
			$("#login-container").addClass("hide");
			$("#todo-container").removeClass("hide");

		});
	});
	//Login Button
	$("#loginButton").on("click", function(){
		let user = {
			"email": $("#inputEmail").val(),
			"password": $("#inputPassword").val()
		};
		FbAPI.loginUser(user).then( (response)=>{
			console.log("login response", response);
			uid = response.uid;
			createLogoutButton();
			putTodoInDOM();
			$("#login-container").addClass("hide");
			$("#todo-container").removeClass("hide");
		});	
	});
	//Logout Button
	$("#logout-container").on("click", "#logoutButton", function(event){
		console.log("logout", event);
		FbAPI.logoutUser();
		uid = "";
		$("#inputEmail").val("");
		$("#inputPassword").val("");
		$("#inputUsername").val("");
		$("#incomplete-tasks").html("");
		$("#completed-tasks").html("");
		$("#login-container").removeClass("hide");
		$("#todo-container").addClass("hide");
	});

});
