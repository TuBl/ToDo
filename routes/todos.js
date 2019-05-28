var express = require("express");
var router = express.Router();
//connect to db?

var db = require("../models")
var helpers = require("../helpers/todos");

//The commended get/post just to show how it looks before refactoring... peasent

//Route for listing all todos
// router.get('/', function(req, res){
//   //connect to db, finds all the todos
//   db.ToDo.find() 
//     .then(function(todos){
//         // then list them all
//         res.json(todos);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

//route for creating new todo, remember to access data from req we need body-parser

// router.post('/', function(req, res){
//     //create new todo obj in the database
//     db.ToDo.create(req.body)
//         .then(function(newToDo){
//             //reutrn it if success (status(201) = created status code
//             res.status(201).json(newToDo);
//         })
//         .catch(function(err){
//             //report error if fail
//             res.send(err);
//         })
// });


//after refactoring routes to helper folder
//combine .get and .post sinc they share the same route with different verb

router.route('/')
    .get(helpers.getToDos)
    .post(helpers.createToDo)

//get specific todo


router.route('/:todoId')
    .get(helpers.getToDo)
    .put(helpers.updateToDo)
    .delete(helpers.deleteToDo)

module.exports = router;