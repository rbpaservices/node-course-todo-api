var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');


var app = express();
var PORT = process.env.PORT || 3000;
var foundItem;
var nextTodoId = 1;

var todos = [];	



app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoParam = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoParam})

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
	
});

app.post('/todos', function(req, res) {
	var body = req.body;
	 
	 if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){

	 	return res.status(400).send();
	 }  else {
		 	 body = _.pick(body, 'description', 'completed' );
		 	 body.description = body.description.trim();	
			body.id = nextTodoId++;
			  	
			todos.push(body);
					
			res.json(todos);
	 }
})

app.listen(PORT, function() {
	console.log('Todo server listening on port ' + PORT + '!');	
});

