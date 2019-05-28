var db = require("../models");

exports.getToDos = function(req, res){
   //connect to db, finds all the todos
   db.ToDo.find() 
    .then(function(todos){
        // then list them all
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createToDo = function(req, res){
    //create new todo obj in the database
    db.ToDo.create(req.body)
        .then(function(newToDo){
            //reutrn it if success (status(201) = created status code
            res.status(201).json(newToDo);
        })
        .catch(function(err){
            //report error if fail
            res.send(err);
        })
}

exports.getToDo = function(req, res){
   //find a todo based on its id that is stored in the req parameters
   db.ToDo.findById(req.params.todoId)
    .then(function(foundToDo){
        res.json(foundToDo);
    })
    .catch(function(err){
        res.send(err);
    })
}    
exports.updateToDo = function(req, res){
    //findOneAndUpdate: find the id (_id that is = to todoId in the req params), update it with info from req.body
    // setting the {new: true} allows the method to reply with the updated data instead of the old one (default behaviour old one)
   db.ToDo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.deleteToDo = function(req, res){
   db.ToDo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We deleted it!'});
    })
    .catch(function(err){
        res.send(err);
    });
}

module.exports = exports;