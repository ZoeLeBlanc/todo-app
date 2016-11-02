"use strict";

var FbAPI = ( ()=> {
	return {
		firebaseCredentials: ()=>{
			return new Promise((resolve, reject)=> {
				$.ajax({
					method: 'GET',
					url: `apiKeys.json`
				}).then((response)=>{
					resolve(response);
				},(error)=>{
					reject(error);
				});
			});
		}
	};
})();