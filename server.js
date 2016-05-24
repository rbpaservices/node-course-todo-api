var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var foundItem;
var nextTodoId = 1;

var todos = [];	



function getTodoItem(todoParam){

	 return new Promise(function(resolve, reject){

		 	if(typeof todoParam != 'string') {
		 		 
 				reject('Bad Todo Item');
 			} else {

 			 		for (var i = todos.length - 1; i >= 0; i--) {
		
		 				 

						if (todos[i].id.toString() === todoParam) {
							 
							foundItem = todos[i];
 			 
						}
					}

					if (foundItem.id.toString() === todoParam) {
						console.log('resolve')
						resolve(foundItem);
					} else {
						console.log('reject')
					
						reject('Todo Item Not found');
					}
				}

	})
}


app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoParam = req.params.id;
	

	try { 
	getTodoItem(todoParam);

		if(foundItem.id.toString() === todoParam) {	
	 		res.send('Requested todo item # ' + foundItem.id + '.')
 		} else {
 			 
 			res.status(404).send('Requested Todo Item Not Found');
 		}
	}catch (e) {
		res.status(404).send(e);
	}
	
});

app.post('/todos', function(req, res) {
	var body = req.body;
	 
		body.id = nextTodoId;
	  	nextTodoId ++;

	  	todos.push(body);
			
	res.json(todos);
})

app.listen(PORT, function() {
	console.log('Todo server listening on port ' + PORT + '!');	
});

