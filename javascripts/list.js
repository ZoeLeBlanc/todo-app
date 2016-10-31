var List = ( () => {
	var todoItems = [];

	return {
		loadTodoList: ()=>{
			$.ajax({
				url: "todo.json"
			}).done( (listData)=> {
				todoItems = listData.todo;
				console.log(todoItems);
			}).fail( (error)=>{
				console.log("error", error);
			});
		}
	}
})(List || {});